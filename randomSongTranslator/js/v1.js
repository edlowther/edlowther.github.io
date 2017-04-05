window.onload = init;
var context;
var bufferLoader;
var isPlaying = false;
var lastSongPlayed;

var songData = [
    {
        'songName': 'Bare Necessities', 
        'versions': [
            {
                'language': 'English', 
                'songUrl': './sounds/bare necessities english.wav'
            }, 
            {
                'language': 'Japanese', 
                'songUrl': './sounds/bare necessities japanese.wav'
            }, 
            {
                'language': 'Cantonese', 
                'songUrl': './sounds/bare necessities cantonese.wav'
            }, 
            {
                'language': 'Spanish', 
                'songUrl': './sounds/bare necessities spanish.wav'
            }
        ]
    }, 
    {
        'songName': 'Everybody wants to be a cat', 
        'versions': [
            {
                'language': 'English', 
                'songUrl': './sounds/everybody cat english.wav'
            }, 
            {
                'language': 'Portugese', 
                'songUrl': './sounds/everybody cat Portuguese.wav'
            }, 
            {
                'language': 'Finnish', 
                'songUrl': './sounds/everybody cat finnish.wav'
            }, 
            {
                'language': 'Hebrew', 
                'songUrl': './sounds/everybody cat hebrew.wav'
            }, 
            {
                'language': 'French', 
                'songUrl': './sounds/everybody cat french.wav'
            }
        ] 
    }, 
    {
        'songName': 'Can you feel the love tonight (slow version)', 
        'versions': [
            {
                'language': 'English', 
                'songUrl': './sounds/love tonight v1 english.wav'
            }, 
            {
                'language': 'Spanish', 
                'songUrl': './sounds/love tonight v1 spanish.wav'
            }, 
            {
                'language': 'Hindi', 
                'songUrl': './sounds/love tonight v1 hindi.wav'
            }
        ] 
    }, 
    {
        'songName': 'Can you feel the love tonight (quick version)', 
        'versions': [
            {
                'language': 'Zulu', 
                'songUrl': './sounds/love tonight v2 zulu.wav'
            }, 
            {
                'language': 'Russian', 
                'songUrl': './sounds/love tonight v2 russian.wav'
            }, 
            {
                'language': 'Arabic', 
                'songUrl': './sounds/love tonight v2 arabic.wav'
            }, 
            {
                'language': 'Portuguese', 
                'songUrl': './sounds/love tonight v2 portuguese.wav'
            }
        ] 
    }, 
    {
        'songName': 'Supercalifragilisticexpialidocious', 
        'versions': [
            {
                'language': 'English', 
                'songUrl': './sounds/supercalifragilisticexpialidocious english.wav'
            }, 
            {
                'language': 'Swedish', 
                'songUrl': './sounds/supercalifragilisticexpialidocious swedish.wav'
            }, 
            {
                'language': 'Japanese', 
                'songUrl': './sounds/supercalifragilisticexpialidocious japanese.wav'
            }, 
            {
                'language': 'Portuguese', 
                'songUrl': './sounds/supercalifragilisticexpialidocious portuguese.wav'
            }
        ] 
    }, 
    {
        'songName': 'Just a spoonfull of sugar', 
        'versions': [
            {
                'language': 'German', 
                'songUrl': './sounds/spoonfull of sugar german.wav'
            }, 
            {
                'language': 'French', 
                'songUrl': './sounds/spoonfull of sugar french.wav'
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
        $('.skip').prop( "disabled", false );
    })
    delayRandomness = setTimeout(startRandomness, 4000);
}

var songSwitcher;

function startRandomness () {
    console.log('randomness started');
    if (songSwitcher) {
        clearInterval(songSwitcher);
    }
    songSwitcher = setInterval(function(){ 
        console.log('tick');
        if (isPlaying) {
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
    while (nextSong === songToPlay) {
        console.log(nextSong);
        nextSong = Math.floor(Math.random() * songData.length);
    }
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
    
}) 