var npm = require('npm');

var AutoUpdater = require('auto-updater');
 
var autoupdater = new AutoUpdater({});

autoupdater.on('check.up-to-date', function(v) {
  console.info("You have the latest version: " + v);
});
autoupdater.on('check.out-dated', function(v_old, v) {
  console.warn("Your version is outdated. " + v_old + " of " + v);
});

// Start checking
autoupdater.fire('check');

