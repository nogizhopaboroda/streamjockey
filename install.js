#!/usr/bin/env node

var fs = require("fs");

var HOME_DIR    = process.env.HOME || process.env.USERPROFILE;
var RC_FILE     = HOME_DIR + "/.sjrc.js";

var TEMPLATE = (function(){
  module.exports = {
    "nogizhopaboroda.github.io/stream-jockey": {
      "play": function(){
        console.log('play button pressed');
        document.querySelector('#play_button').click();
        return true;
      },
      "pause": function(){
        console.log('pause button pressed');
        document.querySelector('#pause_button').click();
        return false;
      },
      "next": function(){
        console.log('next button pressed');
        document.querySelector('#next_button').click();
        return true;
      },
      "prev": function(){
        console.log('prev button pressed');
        document.querySelector('#prev_button').click();
        return true;
      },
      "is_playing": function(){
        return document
              .querySelector('#play_button')
              .classList
              .contains('is-playing');
      }
    }
  }
})
.toString()
.replace(/function.*\{([\s\S]+)\}$/ig, "$1");

fs.stat(RC_FILE, function(err, stats){
  if(!err){
    console.log('rc file already exists');
    return;
  }
  fs.writeFile(RC_FILE, TEMPLATE, 'utf8', (error) => {
    if (error) throw err;
    console.log('RC file created: '.concat(RC_FILE));
  });
});
