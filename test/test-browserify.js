var test = require('tape')
var concat = require('concat-stream')
var browserify = require('browserify')

test('Test if module can be browserified', function (t) {
  var b = '(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.validateSchema = f()}})'

  t.plan(1)
  var bopts = { standalone: 'validateSchema' }
  browserify('./test/modules/validate-schema.js', bopts)
    .bundle()
    .pipe(concat(function (r) {
      var body = r.toString('utf8').substr(0, b.length)
      t.equal(body, b, 'browserified bundle is ok')
      t.end()
    }))
})

