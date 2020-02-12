const rpn = require('request-promise-native')
const { clientId, clientSecret, tokenEndpoint } = require('./config')

// The auth module object.
const auth = {}

// @name getAccessToken
// @desc Makes a request for a token using client credentials.
auth.getAccessToken = function () {
  return new Promise((resolve, reject) => {
    // These are the parameters necessary for the OAuth 2.0 Client Credentials Grant Flow.
    // For more information, see Service to Service Calls Using Client Credentials (https://msdn.microsoft.com/library/azure/dn645543.aspx).
    const requestParams = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: 'https://graph.microsoft.com/.default'
    }

    rpn.post({ url: tokenEndpoint, form: requestParams }).then(getToken, error)

    function getToken (body) {
      const parsedBody = JSON.parse(body)

      if (parsedBody.error) {
        return reject(parsedBody.error_description)
      } else {
        // If successful, return the access token.
        return resolve(parsedBody.access_token)
      }
    }
    function error (err) {
      return reject(err)
    }
  })
}

module.exports = auth
