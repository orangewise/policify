var ZSchema = require('z-schema')

ZSchema = new ZSchema({
  breakOnFirstError: true,
  noExtraKeywords: true,
  ignoreUnknownFormats: false,
  reportPathAsArray: true
})

var policify = {}

module.exports = policify

policify.validate = function (injected, schema) {
  return ZSchema.validate(injected, schema)
}
