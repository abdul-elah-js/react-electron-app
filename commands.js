#!/usr/bin/env node

const program = require('commander');
const react_electron = require('./index');

program
  .version('1.0.0', '-v, --version')
  .description('Create [React/Electron] App Ready For Production')

program
  .command('new <appname>')
  .description('Create [React/Electron] App')
  .action(appname => react_electron.create_app(appname))

program.parse(process.argv)
