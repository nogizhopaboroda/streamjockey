var applescript = require('applescript');
var Promise = require('bluebird');
var mediakeys = require('mediakeys').listen();
var help = require('./help');

(process.argv[2] === '-h' || process.argv[2] === '--help') && help.print_help();
(process.argv[2] === '-v' || process.argv[2] === '--version') && help.print_version();

var browsers = ["Google Chrome", "Safari"];

var rules_file =
  process.argv[2] ||
  (process.env.HOME + '/.sjrc.json') ||
  (process.env.USERPROFILE + '/.sjrc.json');

try {
  var rules = require(rules_file);
} catch(e) {
  console.log("can't load settings file: ".concat(rules_file));
  process.exit(0);
}

var state = null;

function build_script(site, func, browser){
  return [
  'tell application "' + browser + '"',
    'set window_list to every window',            // get the windows
    'repeat with the_window in window_list',      // for every window
       'set tab_list to every tab in the_window', // get the tabs
       'repeat with the_tab in tab_list',         // for every tab
          'if url of the_tab contains "' + site + '" then',
              'tell the_tab',
                browser === "Google Chrome"
                ? 'set output to execute javascript "(' + func.toString() + ')()"'
                : 'set output to do JavaScript "(' + func.toString() + ')()"',
                'return output',
              'end tell',
          'end if',
       'end repeat',
    'end repeat',
  'end tell'
  ].join('\n');
}

function exec_script(site, func, browser){
  return new Promise(function(resolve, reject){
    applescript.execString(build_script(site, func, browser), function(err, rtn) {
      resolve({ site: site, browser: browser, output: rtn, error: err });
    });
  });
}

function get_state(){
  return Promise.map(Object.keys(rules), function(site){
    var func = rules[site].is_playing;
    return Promise.map(browsers, function(browser){
      return exec_script(site, func, browser).then(function(data){
        data.is_playing = (data.output === 'true');
        return data;
      });
    });
  })
  .then(function(data){
    return data.reduce(function(acc, item){
      return acc.concat(item);
    }, []);
  })
  .then(function(data){
    return data.filter(function(item){
      return !!item.output;
    });
  });
}

function play_pause(){
  get_state()
  .then(function(data){
    var active_sites = data.filter(function(item){
      return item.is_playing;
    });
    active_sites.length || (active_sites = null);
    return Promise.map(
      active_sites || state || data.slice(0, 1),
      function(item){
        return exec_script(
          item.site,
          rules[item.site][item.is_playing ? 'pause' : 'play'],
          item.browser
        ).then(function(response){
          return Object.assign({}, response, { is_playing: !item.is_playing });
        });
      }
    );
  })
  .then(function(data){
    return (state = data);
  })
  .then(function(data){
    //all done
    data.forEach(function(item){
      console.log([
        item.is_playing ? 'playing' : 'stopping',
        item.site,
        'in browser',
        item.browser
        ].join(' ')
      );
    });
  });
}


mediakeys.on('play', function(){
    play_pause();
});
mediakeys.on('next', function(){
    console.log('next');
});
mediakeys.on('back', function(){
    console.log('back');
});

console.log('listening...\n');
