var browserify = require('browserify')
var through = require('through2')

module.exports = policify
function policify (mod) {
  var r = 'var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.policify = f()'
  var policy = 'var g={};g.policify=f();context.setVariable("bundle", g)'

  var bopts = { standalone: 'policify' }
  return browserify(mod, bopts)
   .bundle()
   .pipe(through(function (buf, enc, next) {
     var t = buf.toString()
     if (t.indexOf(r) > -1) {
       var x = t.replace(r, policy)
       this.push(x)
     } else {
       this.push(t)
     }
     next()
   }))
}
