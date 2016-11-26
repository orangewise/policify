var policify = require('./index.js')
var file = './test/modules/validate-schema.js'

policify(file)
  .pipe(process.stdout)

