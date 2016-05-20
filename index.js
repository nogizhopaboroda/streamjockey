var applescript = require('applescript');
var Promise = require('bluebird');
var mediakeys = require('mediakeys').listen();

var browsers = ["Google Chrome"];

var rules = {
  "mixcloud.com": {
    play: function(){
      document.querySelector('.player-control').click();
      return 'play';
    },
    pause: function(){
      document.querySelector('.player-control').click();
      return 'pause';
    },
    next: function(){},
    prev: function(){},
    is_playing: function(){
      return document.querySelector('.player-control').classList.contains('pause-state');
    },
    current_media_title: function(){}
  },
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
    is_playing: function(){
      return document.querySelector('#ac_play').classList.contains('playing');
    },
    current_media_title: function(){}
  }
};

var state = null;

function build_script(site, func){
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

function exec_script(site, func){
  return new Promise(function(resolve, reject){
    applescript.execString(build_script(site, func), function(err, rtn) {
      resolve({ site: site, output: rtn, error: err });
    });
  });
}

function get_state(){
  return Promise.map(Object.keys(rules), function(site){
    var func = rules[site].is_playing;
    return exec_script(site, func).then(function(data){
      data.is_playing = (data.output === 'true');
      return data;
    });
  });
}

function play_pause(){
  get_state()
  .then(function(data){
    var active_sites = data.filter(function(item){
      return item.is_playing;
    });
    if(active_sites.length){
      return Promise.map(active_sites, function(item){
        return exec_script(item.site, rules[item.site].pause).then(function(response){
          return Object.assign({}, response, { is_playing: false });
        });
      });
    }
    !state && (state = data.slice(0, 1));
    return Promise.map(state, function(item){
      return exec_script(item.site, rules[item.site].play).then(function(response){
        return Object.assign({}, response, { is_playing: true });
      });
    });
  })
  .then(function(data){
    return (state = data);
  })
  .then(function(data){
    //all done
    console.log(data, state); //here data === state
  });
}


mediakeys.on('play', function(){
    console.log('play/pause');
    play_pause();
});
mediakeys.on('next', function(){
    console.log('next');
});
mediakeys.on('back', function(){
    console.log('back');
});


console.log('listening...');
