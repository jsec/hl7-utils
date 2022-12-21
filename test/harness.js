// Mocha hack because some terminal themes don't like ANSI 90
const { colors } = require('mocha/lib/reporters/base');
colors.pass = 37;
