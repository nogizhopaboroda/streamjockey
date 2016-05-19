var applescript = require('applescript');

var rules = {
  //"mixcloud.com": {
    //play: function(){
      //document.querySelector('.player-control').click();
      //return 'play';
    //},
    //pause: function(){
      //document.querySelector('.player-control').click();
      //return 'pause';
    //},
    //next: function(){},
    //prev: function(){},
    //is_playing: function(){},
    //current_media_title: function(){}
  //},
  "vk.com/audios": {
    play: function(){
      document.querySelector('#ac_play').click();
      return 'play';
    },
    pause: function(){
      document.querySelector('#ac_play').click();
      return 'pause';
    },
    next: function(){},
    prev: function(){},
    is_playing: function(){},
    current_media_title: function(){}
  }
};

var build_script = function(site, func){
  return [
  'tell application "Google Chrome"',
    'set window_list to every window',            // get the windows
    'repeat with the_window in window_list',      // for every window
       'set tab_list to every tab in the_window', // get the tabs
       'repeat with the_tab in tab_list',         // for every tab
          'if url of the_tab contains "' + site + '" then',
              'tell the_tab',
                'set output to execute javascript "(' + func.toString() + ')()"',
                'return output',
              'end tell',
          'end if',
       'end repeat',
    'end repeat',
  'end tell'
  ].join('\n');
}


var play_pause = function(){
  for(var site in rules){
    var func = rules[site].play;
    applescript.execString(build_script(site, func), function(err, rtn) {
      if (err) {
        // Something went wrong!
        console.log(err);
      }
      console.log(rtn);
    });
  }
}


var mediakeys = require('mediakeys').listen();
mediakeys.on('play', function () {
    console.log('play/pause');
    play_pause();
})
mediakeys.on('next', function () {
    console.log('next');
})
mediakeys.on('back', function () {
    console.log('back');
})
