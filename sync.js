var map = require('lodash.map');
var compose = require('lodash.compose');
var Value = require('transformer-conversion').Value

// composition of sync functions.
module.exports = function transformerSyncCompose(conversions) {
  map(conversions, function(c) {
    if (c.async) {
      throw new Error("Cannot use Async conversion in Sync context. " +
        " use transformer.async");
    }
  })

  composed = compose.apply(this, conversions.reverse());
  return Value.wrapSync(conversions[0].inType, composed);
}
