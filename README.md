# stream jockey

[Work in progress]

Stream Jockey provides you a way to control media streaming services (like soundcloud, mixcloud, youtube, etc) in browser. Right in the existing instance of your browser where you read this message.

## Requirements

- Os: Mac OS
- Browser: Chrome or Safari
- ***If node version >= 4 : XCode 7***

## Installation
```shell
npm install -g streamjockey
```
or
```shell
git clone git@github.com:nogizhopaboroda/streamjockey.git
cd streamjockey
npm install
```

Then run the application
```shell
streamjockey
```
or
```shell
node index.js
```
in case you've chosen variant with cloning repository

then go to the demo page http://nogizhopaboroda.github.io/streamjockey#demo

to make sure that application works well

## Usage

***
```shell
streamjockey -h

      Usage: streamjockey [rcfile]
      Options:
        -h, --help            output usage information
        -v, --version         output the version number
```
***

## RC file
***
RC file should be a valid nodejs module and consist of key-value pairs 

where key is **url matcher** and value contains at least this 3 functions: **play**, **pause**, **is_playing**

optionally there might be functions **prev** and **next**

***

after installation application saves default RC file here: `~/.sjrc.js` with snippets for page http://nogizhopaboroda.github.io/streamjockey#demo

***

all the functions should be javascript snippets that can be executable on target page, e.g.:
```js
document.querySelector('<play button selector>').click();
//or
window.AudioPlayerInstance.play();
```

you can test them right in browser console on target page

**play**: plays media

**pause**: stops/pauses media

**is_playing**: should return `true` if media is playing and `false` or anything else if not

**next**: next media source

**prev**: previous media source

Example:
```js
module.exports = {
  "<url_matcher>": { //e.g.: "nogizhopaboroda.github.io/streamjockey"
    /* required functions */
    "play": function(){
      document.querySelector('<play button selector>').click();
      return 'play'; //return is optional
    },
    "pause": function(){
      document.querySelector('<pause button selector>').click();
      return 'pause';
    },
    "is_playing": function(){
      //return is required
      return document.querySelector('<play/pause button selector>').classList.contains('playing');
    },
    /* optional functions */
    "next": function(){
      document.querySelector('<next button selector>').click();
    },
    "prev": function(){
      document.querySelector('<prev button selector>').click();
    },
  }
}
```

***

As long as RC file is node module, you can require one module from another, e.g.:
```js
// ~/.sjrc.js
module.exports = require('./.dotfiles/sjrc.js');
```

***

There might be more than one target sites. Streamjockey handles it well

***

Just check out the demo if you still didn't do so. It can tell much more than text here. 

## How it works
Application uses native binding for mediakeys interception (https://github.com/tcr/mediakeys) and executes js code in browser using applescript.
That's why there is no Firefox support - it's not scriptable.

## Bugs/Issues/Feature requests
Create new issue [here](https://github.com/nogizhopaboroda/streamjockey/issues)
