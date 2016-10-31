var test = require('tape');
var concat = require('concat-stream');
var policify = require('../');

test('Test policify', function (t) {
  var b = '(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g={};g.policify=f();context.setVariable("bundle", g)}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof';

  t.plan(1);
  policify('./test/modules/validate-schema.js')
    .pipe(concat(function (r) {
      var body = r.toString('utf8').substr(0, b.length);
      t.equal(body, b, 'policified code is ok');
      t.end();
    }));

});

