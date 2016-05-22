module.exports = {
  "print_help": function(){
    console.log(
      (function(){/*
      Usage: streamjockey <rcfile>
      Options:
        -h, --help            output usage information
        -v, --version         output the version number
      */})
      .toString()
      .replace(/function.*\{\/\*([\s\S]+)\*\/\}$/ig, "$1")
    );
    process.exit(0);
  },
  "print_version": function(){
    console.log(require("./package.json").version);
    process.exit(0);
  }
}
