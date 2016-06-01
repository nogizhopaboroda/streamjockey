# stream jockey

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
and go to the demo page http://nogizhopaboroda.github.io/streamjockey#demo

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
RC file should be a valid nodejs module and consist of key-value pairs 

where key is url matcher and value contains at least this 3 functions: *play*, *pause*, *is_playing* 

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

## How it works

## Bugs/Issues/Feature requests
Create new issue [here](https://github.com/nogizhopaboroda/streamjockey/issues)
