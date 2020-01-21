const assert = require('assert')
const conf = require('../config')

describe('ADAL', function () { // eslint-disable-line no-undef
  it( // eslint-disable-line no-undef
    'Checking clientID, clientSecret, tokenEndpoint, siteId and listId in config.js',
    function () {
      assert(
        isADALConfigured(conf),
        '\nRegister clientID, clientSecret, tokenEndpoint, siteId and listId in file config.js.\n' +
        'You don\'t have them? Register your app in the Microsoft Azure Portal\n' +
        'http://manage.windowsazure.com\n' +
        'App type: Web Application\n' +
        'Sign on URL: http://localhost:3000\n' +
        'App permissions: Microsoft Graph > Read items in all site collections\n\n' +
        'Note: These are application permissions, not delegated permissions.'
      )
    }
  )
})

function isADALConfigured (configuration) {
  const clientIDConfigured =
    typeof (configuration.clientId) !== 'undefined' &&
    configuration.clientId !== null &&
    configuration.clientId !== '' &&
    configuration.clientId !== 'ENTER_YOUR_CLIENT_ID'
  const clientSecretConfigured =
    typeof (configuration.clientSecret) !== 'undefined' &&
    configuration.clientSecret !== null &&
    configuration.clientSecret !== '' &&
    configuration.clientSecret !== 'ENTER_YOUR_SECRET'
  const tokenEndpointConfigured =
    typeof (configuration.tokenEndpoint) !== 'undefined' &&
    configuration.tokenEndpoint !== null &&
    configuration.tokenEndpoint !== '' &&
    configuration.tokenEndpoint !== 'ENTER_YOUR_TOKEN_ISSUING_ENDPOINT'
  const siteIdConfigured =
    typeof (configuration.siteId) !== 'undefined' &&
    configuration.siteId !== null &&
    configuration.siteId !== '' &&
    configuration.siteId !== 'ENTER_YOUR_SITE_ID'
  const listIdConfigured =
    typeof (configuration.listId) !== 'undefined' &&
    configuration.listId !== null &&
    configuration.listId !== '' &&
    configuration.listId !== 'ENTER_YOUR_LIST_ID'

  return clientIDConfigured && clientSecretConfigured && tokenEndpointConfigured && siteIdConfigured && listIdConfigured
}
