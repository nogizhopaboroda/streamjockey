var applescript = require('applescript');

var func = function(){
  var test='wow!';
  document.querySelector('.player-control').click();
  return test;
};

var script = [
  'tell application "Google Chrome"',
    'set window_list to every window',            // get the windows
    'repeat with the_window in window_list',      // for every window
       'set tab_list to every tab in the_window', // get the tabs
       'repeat with the_tab in tab_list',         // for every tab
          'if url of the_tab contains "mixcloud.com" then',
              'log "bar"',
              'tell the_tab',
                'set myVar to execute javascript "(' + func.toString() + ')()"',
                'return myVar',
              'end tell',
          'end if',
       'end repeat',
    'end repeat',
  'end tell'
].join('\n');

applescript.execString(script, function(err, rtn) {
  if (err) {
    // Something went wrong!
    console.log(err);
  }
  console.log(rtn, err);
});


var mediakeys = require('mediakeys').listen();
mediakeys.on('play', function () {
    console.log('play');
})
mediakeys.on('next', function () {
    console.log('next');
})
mediakeys.on('back', function () {
    console.log('back');
})
