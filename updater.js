var npm = require('npm');
var AutoUpdater = require('auto-updater');

module.exports = function(auto_update){
  var autoupdater = new AutoUpdater({});

  autoupdater.on('check.out-dated', function(v_old, v){
    console.warn("Your version is outdated. " + v_old + " of " + v);
    if(auto_update){
      console.log('updating automatically...');
      autoupdater.on('update.downloaded', function() {
        console.log("Update downloaded and ready for install");
        autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually. 
      });
      autoupdater.on('update.not-installed', function() {
        console.log("The Update was already in your folder! It's ready for install");
        autoupdater.fire('extract'); // If autoupdate: false, you'll have to do this manually. 
      });
      autoupdater.on('update.extracted', function() {
        console.log("Update extracted successfully!");
        console.warn("RESTART THE APP!");
      });
      autoupdater.fire('download-update');
    }
  });

  autoupdater.fire('check');
}
