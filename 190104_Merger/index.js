'use strict';

const path = require('path');
const Merger = require('./tools/merger');

const merger = new Merger({
  entry: path.resolve(__dirname, 'src'),
  output: path.resolve(__dirname, 'build'),
  tmp: path.resolve(__dirname, 'src/common')
});

merger.init();