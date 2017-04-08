window.onload = init;
var context;
var bufferLoader;
var isPlaying = false;
var randomOn = false;
var songsPlayed = [];

var songData = [
    {
        'songName': 'Bare Necessities', 
        'versions': [
            {
                'language': 'English', 
                'songUrl': './sounds/bare necessities english.mp3'
            }, 
            {
                'language': 'Japanese', 
                'songUrl': './sounds/bare necessities japanese.mp3'
            }, 
            {
                'language': 'Cantonese', 
                'songUrl': './sounds/bare necessities cantonese.mp3'
            }, 
            {
                'language': 'Spanish', 
                'songUrl': './sounds/bare necessities spanish.mp3'
            }
        ]
    }, 
    {
        'songName': 'Everybody wants to be a cat', 
        'versions': [
            {
                'language': 'English', 
                'songUrl': './sounds/everybody cat english.mp3'
            }, 
            {
                'language': 'Portugese', 
                'songUrl': './sounds/everybody cat Portuguese.mp3'
            }, 
            {
                'language': 'Finnish', 
                'songUrl': './sounds/everybody cat finnish.mp3'
            }, 
            {
                'language': 'Hebrew', 
                'songUrl': './sounds/everybody cat hebrew.mp3'
            }, 
            {
                'language': 'French', 
                'songUrl': './sounds/everybody cat french.mp3'
            }
        ] 
    }, 
    {
        'songName': 'Can you feel the love tonight (slow version)', 
        'versions': [
            {
                'language': 'English', 
                'songUrl': './sounds/love tonight v1 english.mp3'
            }, 
            {
                'language': 'Spanish', 
                'songUrl': './sounds/love tonight v1 spanish.mp3'
            }, 
            {
                'language': 'Hindi', 
                'songUrl': './sounds/love tonight v1 hindi.mp3'
            }
        ] 
    }, 
    {
        'songName': 'Can you feel the love tonight (quick version)', 
        'versions': [
            {
                'language': 'Zulu', 
                'songUrl': './sounds/love tonight v2 zulu.mp3'
            }, 
            {
                'language': 'Russian', 
                'songUrl': './sounds/love tonight v2 russian.mp3'
            }, 
            {
                'language': 'Arabic', 
                'songUrl': './sounds/love tonight v2 arabic.mp3'
            }, 
            {
                'language': 'Portuguese', 
                'songUrl': './sounds/love tonight v2 portuguese.mp3'
            }
        ] 
    }, 
    {
        'songName': 'Supercalifragilisticexpialidocious', 
        'versions': [
            {
                'language': 'English', 
                'songUrl': './sounds/supercalifragilisticexpialidocious english.mp3'
            }, 
            {
                'language': 'Swedish', 
                'songUrl': './sounds/supercalifragilisticexpialidocious swedish.mp3'
            }, 
            {
                'language': 'Japanese', 
                'songUrl': './sounds/supercalifragilisticexpialidocious japanese.mp3'
            }, 
            {
                'language': 'Portuguese', 
                'songUrl': './sounds/supercalifragilisticexpialidocious portuguese.mp3'
            }
        ] 
    }, 
    {
        'songName': 'Just a spoonfull of sugar', 
        'versions': [
            {
                'language': 'German', 
                'songUrl': './sounds/spoonfull of sugar german.mp3'
            }, 
            {
                'language': 'French', 
                'songUrl': './sounds/spoonfull of sugar french.mp3'
            }
        ] 
    }
];

var songToPlay = Math.floor(Math.random() * songData.length);

function init() {
  // Fix up prefixing
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    var songUrls = []; 
    $.each(songData[songToPlay].versions, function(index, value) {
        songUrls.push(value.songUrl);
    })
    
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    songUrls,
    finishedLoading
    );

  bufferLoader.load();
    
    
}

var delayRandomness;

function finishedLoading(bufferList) { 
    console.log('finished loading');
    $.each(songData[songToPlay].versions, function(index, value) {
        value.source = context.createBufferSource();
        value.source.buffer = bufferList[index];
        value.gainNode = context.createGain();
        value.source.connect(value.gainNode);
        value.source.onended = function() {
            console.log('ended');
            isPlaying = false;
        };
        value.gainNode.connect(context.destination);
        if (index === 0) {
            value.gainNode.gain.value = 1;
            $('.languageLister').text(songData[songToPlay].songName + ': ' + value.language);
        } else {
            value.gainNode.gain.value = 0;
        }
        value.source.start(0);
        isPlaying = true;
        randomOn = true;
        $('.skip').prop( "disabled", false );
    })
    delayRandomness = setTimeout(startRandomness, 4000);
}

var songSwitcher;

function startRandomness () {
    initialiseSongSelector();
    $('.languageContainer').show();
    console.log('randomness started');
    if (songSwitcher) {
        clearInterval(songSwitcher);
    }
    songSwitcher = setInterval(function(){ 
        console.log('tick');
        if (isPlaying && randomOn) {
            var versionToSwitchOn = Math.floor(Math.random() * songData[songToPlay].versions.length);
            $.each(songData[songToPlay].versions, function(index, version) {
                if (index === versionToSwitchOn) {
                    version.gainNode.gain.value = 1;
                    $('.languageLister').text(songData[songToPlay].songName + ': ' + version.language);
                } else {
                    version.gainNode.gain.value = 0;
                }
            })
        }
    }, 2000);
    
}

$('.playPause').on('click', function() {
    if (isPlaying) {
        isPlaying = false;
        $('.playPause').text('Play');
        context.suspend();
    } else {
        isPlaying = true;
        $('.playPause').text('Pause');
        context.resume();
    }
})

$('.skip').on('click', function() {
    $('.languageLister').text('Loading...');
    
    if (isPlaying) {
        $.each(songData[songToPlay].versions, function(index, value) {
            value.source.stop();
        })
        isPlaying = false;
        $('.skip').prop( "disabled", true );
    }
    
    var nextSong = Math.floor(Math.random() * songData.length);
    if (songsPlayed.length == songData.length - 1) {
        songsPlayed = [];
    }
    
    while (nextSong === songToPlay || $.inArray(nextSong, songsPlayed) >= 0) {
        console.log(nextSong);
        nextSong = Math.floor(Math.random() * songData.length);
    }
    songsPlayed.push(songToPlay);
    songToPlay = nextSong;
    
    var songUrls = []; 
    $.each(songData[songToPlay].versions, function(index, value) {
        songUrls.push(value.songUrl);
    })
    bufferLoader.urlList = songUrls;
    clearTimeout(delayRandomness);
    clearInterval(songSwitcher);

      bufferLoader = new BufferLoader(
    context,
    songUrls,
    finishedLoading
    );

  bufferLoader.load();
    $('.languageContainer').hide();
    
}) 

function initialiseSongSelector() {
    $('.languageSelector').empty();
    $.each(songData[songToPlay].versions, function(index, value) {
        var htmlString = '<div class="languageButton" index="' + index + '">' + value.language + '</div>';
        $('.languageSelector').append($(htmlString));
    })
    $('.languageButton').on('click', function() {
        $('.selected').removeClass('selected');
        $(this).addClass('selected');
        var buttonIndex = parseInt($(this).attr('index'));
        randomOn = false;
        
        $.each(songData[songToPlay].versions, function(index, version) {
            if (index === buttonIndex) {
                console.log('match')
                version.gainNode.gain.value = 1;
                $('.languageLister').text(songData[songToPlay].songName + ': ' + version.language);
            } else {
                version.gainNode.gain.value = 0;
            }
        })
    })
    
    $('.randomButton').on('click', function() {
        if (!randomOn) {
            $('.selected').removeClass('selected');
            $(this).addClass('selected');
            randomOn = true;
        }
    })
}
