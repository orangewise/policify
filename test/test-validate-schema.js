var test = require('tape');
var validateSchema = require('./modules/validate-schema');

test('Test NPM module', function (t) {
  var obj = { "savingsAccounts": [{"id":"1","number":"7404","iban":"NL93INGAEGO075574","balance":"788.34"}]};
  var s = require('./fixtures/schema.json');
  t.plan(2);
  t.equal(true, validateSchema.validate(obj, s), 'object that conforms to schema should return true');
  obj = { "blaAccounts": [{"id":"1","number":"7404","iban":"NL93INGAEGO075574","balance":"788.34"}]};
  t.equal(false, validateSchema.validate(obj, s), 'object that does not conform to schema should return false');
  t.end();
});
