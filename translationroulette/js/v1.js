window.onload = init;
var context;
var bufferLoader;

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
                'songUrl': './sounds/everybody cat portuguese.mp3'
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
        'songName': 'Just a spoonful of sugar',
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

var player = {
    isPlaying: false,
    isSkipping: false,
    songsLoaded: false,
    loadingInterval: false,
    randomOn: true,
    randomReady: false,
    songsPlayed: [],
    songToPlay: Math.floor(Math.random() * songData.length),
    randomVersionSwitcher: null,
    getNewSongToPlay: function () {
        console.log('getting new song to play')
        this.songsPlayed.push(this.songToPlay);
        var nextSong = Math.floor(Math.random() * songData.length);
        if (this.songsPlayed.length == songData.length - 1) {
            this.songsPlayed = [];
        }
        while (nextSong === this.songToPlay || $.inArray(nextSong, this.songsPlayed) >= 0) {
            nextSong = Math.floor(Math.random() * songData.length);
        }
        this.songToPlay = nextSong;
        this.loadVersions();
    },
    getReadyToRandom: function () {
        setTimeout(function () {
            player.randomReady = true;
            player.initialiseVersionSelectorButtons();
        }, 4000);
    },
    play: function () {
        context.resume();
        this.isPlaying = true;
        this.getReadyToRandom();
        this.randomVersionSwitcher = setInterval(function () {
            console.log('tick', player.randomReady);
            if (player.isPlaying && player.randomOn && !player.isSkipping && player.randomReady) {
                var versionToSwitchOn = Math.floor(Math.random() * songData[player.songToPlay].versions.length);
                $.each(songData[player.songToPlay].versions, function (index, version) {
                    if (index === versionToSwitchOn) {
                        version.gainNode.gain.value = 1;
                        $('.songTitle').text(songData[player.songToPlay].songName);
                        $('.songLanguage').text(version.language);
                    } else {
                        version.gainNode.gain.value = 0;
                    }
                })
            }
        }, 2000)
        $('.playPause').text('Pause');
    },
    pause: function () {
        context.suspend();
        this.isPlaying = false;
        clearInterval(this.randomVersionSwitcher);
        $('.playPause').text('Play');
    },
    stopAllCurrentAudio: function () {
        console.log('stopping')
        $.each(songData[this.songToPlay].versions, function (index, value) {
            value.source.stop();
        })
    },
    loadVersions: function () {
        var loadingIntervalIndex = 0;
        $('.songLanguage').addClass('loading');
        this.loadingInterval = setInterval(function () {
            loadingIntervalIndex += 1;
            loadingText = '.';
            for (var i = 0; i < loadingIntervalIndex % 3; i++) {
                loadingText += '.';
            }
            $('.songLanguage').text(loadingText);
        }, 150);
        var songUrls = [];
        $.each(songData[this.songToPlay].versions, function (index, value) {
            songUrls.push(value.songUrl);
        })
        bufferLoader = new BufferLoader(
            context,
            songUrls,
            finishedLoading
        );
        bufferLoader.load();

    },
    skip: function () {
        $('.languageContainer').hide(1000);
        this.isSkipping = true;
        this.randomOn = true;
        this.randomReady = false;
        $('.songTitle').text('Loading');
        $('.songLanguage').text('...');
        this.stopAllCurrentAudio();
        this.getNewSongToPlay();
    },
    initialiseVersionSelectorButtons: function () {
        $('.randomButton').addClass('selected');
        $('.languageSelector').empty();
        $.each(songData[player.songToPlay].versions, function (index, value) {
            var htmlString = '<div class="languageButton" index="' + index + '">' + value.language + '</div>';
            $('.languageSelector').append($(htmlString));
        })
        $('.languageButton').on('click', function () {
            $('.selected').removeClass('selected');
            $(this).addClass('selected');
            var buttonIndex = parseInt($(this).attr('index'));
            player.randomOn = false;
            $.each(songData[player.songToPlay].versions, function (index, version) {
                if (index === buttonIndex) {
                    console.log('match')
                    version.gainNode.gain.value = 1;
                    $('.songTitle').text(songData[player.songToPlay].songName);
                    $('.songLanguage').text(version.language);
                } else {
                    version.gainNode.gain.value = 0;
                }
            })
        })

        $('.randomButton').on('click', function () {
            if (!player.randomOn) {
                $('.selected').removeClass('selected');
                $(this).addClass('selected');
                player.randomOn = true;
            }
        })
        $('.languageContainer').show(1000);
    }

}

function init() {
    // Fix up prefixing
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
    player.loadVersions();
}

var delayRandomness;

function finishedLoading(bufferList) {
    console.log('finished loading');
    $('.songLanguage').removeClass('loading');
    $.each(songData[player.songToPlay].versions, function (index, value) {
        value.source = context.createBufferSource();
        value.source.buffer = bufferList[index];
        value.gainNode = context.createGain();
        value.source.connect(value.gainNode);
        value.source.onended = function () {
            console.log('ended');
        };
        value.gainNode.connect(context.destination);
        if (index === 0) {
            value.gainNode.gain.value = 1;
            $('.songTitle').text(songData[player.songToPlay].songName);
            clearInterval(player.loadingInterval);
            $('.songLanguage').text(value.language);
        } else {
            value.gainNode.gain.value = 0;
        }
        value.source.start(0);
    })
    if (!player.isPlaying) {
        $('.skip, .playPause').prop("disabled", false);
        context.suspend();
    } else {
        context.resume();
        player.getReadyToRandom();
    }
    if (player.isSkipping) {
        player.isSkipping = false;
    }
}

$('.playPause').on('click', function () {
    if (player.isPlaying) {
        player.pause();
    } else {
        player.play();
    }
})

$('.skip').on('click', function () {
    player.skip();
})