#!/usr/bin/env node
const program = require('commander');
program
  .version('1.0.0', '-v, --version')
  .command('init <name>')
  .action(name => {
    download(
      'http://xxxxxx:9999:HTML5/H5Template#master',
      name,
      { clone: true },
      err => {
        console.log(err ? 'Error' : 'Success');
      }
    );
  });
program.parse(process.argv);
