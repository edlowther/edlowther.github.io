# -*- coding: utf-8 -*-

import requests
from lxml import html
import time
from collections import defaultdict
import json
from pprint import pprint
from os import listdir
import csv

# Global variables to aggregate the raw data in various ways:
# Firstly, to count up the number of occurences of country codes listed in fourth place
fourthPlaces = defaultdict(int)
# To keep track of which sports we have found fourth place results for
fourthPlacesByDiscipline = {}
# And to ensure that we neither end up double counting fourth places in team events, or
# accidentally overwriting the true result when more than one country is tied for fourth
# we use a set, which will countain tuples holding the name of the discipline and the
# country, or one of the countries, in fourth place
fourthPlacesSet = set()

# Owing to the myriad formats in which the Olympics results data is published, it is
# helpful to search recursively through dictionaries and lists for the country codes
def findCountryCode(d, url):
    if isinstance(d, dict):
        if 'country' in d:
            code = d['country']['odfCode']
            if not url in fourthPlacesByDiscipline or fourthPlacesByDiscipline[url] == '':
                fourthPlacesByDiscipline[url] = code
            if not code == '':
                fourthPlacesSet.add((url, code))
        elif 'countryOdfCode' in d:
            code = d['countryOdfCode']
            if not url in fourthPlacesByDiscipline or fourthPlacesByDiscipline == '':
                fourthPlacesByDiscipline[url] = code
            if not code == '':
                fourthPlacesSet.add((url, code))
        for key in d:
            findCountryCode(d[key], url)
    elif isinstance(d, list):
        for item in d:
            findCountryCode(item, url)

# Similarly, we search recursively for dictionaries indicating a fourth place (or tied
# fourth place: 'T4'). Once found, we call the recursive findCountryCode function on
# that dictionary, which attempts to find the country code nested within the dictionary.
# This is the best approach I could find as the labelling of final results was so
# inconsistent across sports, but it has the unfortunate side effect of sometimes picking up fourth
# place results in heats or 'b' finals (where fourth place does not mean just missing out on a medal,
# but actually missing out by quite a lot). As a result, some manual cleaning of the data was
# required later on - particularly for rowing, sailing and weightlifting results.
def findFourth(d, url):
    if isinstance(d, dict):
        if 'rank' in d:
            if d['rank'] == '4' or d['rank'] == 'T4':
                findCountryCode(d, url)
        for key in d:
            findFourth(d[key], url)
    elif isinstance(d, list):
        for item in d:
            findFourth(item, url)

# One of the trickiest parts of this project was handling the many different ways in which
# the data for bronze medal matches was published.
def findLoserToBronzeMedallist(d, url):
    if isinstance(d, dict):
        if 'isWinner' in d:
            if d['isWinner'] == False:
                findCountryCode(d, url)
        elif 'homeMedal' in d and 'awayMedal' in d:
            if d['awayMedal'] and not d['homeMedal']:
                if 'homeCountry' in d:
                    fourthPlacesByDiscipline[url] = d['homeCountry']['odfCode']
                else:
                    fourthPlacesByDiscipline[url] = d['homeTeam']['country']['odfCode']

            elif d['homeMedal'] and not d['awayMedal']:
                if 'awayCountry' in d:
                    fourthPlacesByDiscipline[url] = d['awayCountry']['odfCode']
                else:
                    fourthPlacesByDiscipline[url] = d['awayTeam']['country']['odfCode']
        elif 'home' in d and 'away' in d and 'medal' in d['home'] and 'medal' in d['away']:
            if d['home']['medal'] and not d['away']['medal']:
                if 'team' in d['away']:
                    fourthPlacesByDiscipline[url] = d['away']['team']['country']['odfCode']
                else:
                    fourthPlacesByDiscipline[url] = d['away']['competitor']['country']['odfCode']
            if d['away']['medal'] and not d['home']['medal']:
                if 'team' in d['away']:
                    fourthPlacesByDiscipline[url] = d['home']['team']['country']['odfCode']
                else:
                    fourthPlacesByDiscipline[url] = d['home']['competitor']['country']['odfCode']

        for key in d:
            findLoserToBronzeMedallist(d[key], url)
    elif isinstance(d, list):
        for item in d:
            findLoserToBronzeMedallist(item, url)

# This function downloads all the results data from the Rio2016 website, for any event marked
# as having resulted in medals for any of the participants. Bizarrely, the data is published
# as a string in json format within a hidden div on the page. Once found by parsing the html
# on the page, this json is saved in a file in the data folder, named with the unique part
# of the url on which the json was found.
def getFullData():
    for day in range(3, 22):
        print 'day', day
        scheduleUrl = 'https://www.rio2016.com/en/schedule-and-results/day-' + str(day)
        resultsUrls = []
        scheduleHtml = html.fromstring(requests.get(scheduleUrl).text)

        table = scheduleHtml.cssselect('table.table-inline__table--schedule')[0]
        for tr in table.cssselect('tr'):
            if len(tr.cssselect('td')) > 0:
                firstCell = tr.cssselect('td')[0]
                if len(firstCell.cssselect('.table-inline__te-sprite--medal-empty')) > 0:
                    resultsUrls.append(tr.get('data-href').strip())

        for resultsUrl in resultsUrls:
            resultsHtml = html.fromstring(requests.get('https://www.rio2016.com' + resultsUrl).text)
            if len(resultsHtml.cssselect('#_results-jsmodel')) > 0:
                resultsString = resultsHtml.cssselect('#_results-jsmodel')[0].text_content()
                f = open('./data/' + resultsUrl.replace('/en/', '') + '.js', 'w')
                f.write(resultsString.encode('utf8', 'replace'))
                f.close()
            else:
                print 'data not found on', 'https://www.rio2016.com' + resultsUrl

            time.sleep(1)
        time.sleep(1)

# Having downloaded all the results data, it is now possible to analyse it using the helper
# functions documented above. The set named fourthPlacesSet is populated with the parsed data,
# then this is iterated through to create a csv file for further analysis and manual cleaning.
def outputFourthPlaceData():
    for filename in listdir('./data/'):
        if '.js' in filename:
            print filename
            resultsData = json.load(open('./data/' + filename))
            findFourth(resultsData, filename)
            if 'bronze' in filename:
                findLoserToBronzeMedallist(resultsData, filename)

    output = csv.DictWriter(open('./output/fourthPlaces_v1.csv', 'wb'), fieldnames=['country', 'discipline', 'url'])
    output.writeheader()

    for datum in fourthPlacesSet:
        fourthPlaces[datum[1]] += 1
        output.writerow({
            'country': datum[1],
            'discipline': datum[0],
            'url': 'https://www.rio2016.com/en/' + datum[0].replace('.js', '')
        })

# Unfortunately this recursive search method does not work in every case, and there are some
# missing disciplines, which can be found by running this function. In some swimming events,
# there were ties on the podium, meaning logically that the next best place (eg fifth in men's
# 100m butterfly) should be substituted for fourth - this has been done manually. Some hockey,
# handball and tennis results were also added manually to the spreadsheet.
def checkForMissingData():
    for filename in listdir('./data/'):
        if '.js' in filename and not filename in fourthPlacesByDiscipline and not 'gold' in filename and not 'boxing' in filename:
            print filename
            print 'https://www.rio2016.com/en/' + filename.replace('.js', '')


# getFullData()