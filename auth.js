const request = require('request')
const Q = require('q')
const { clientId, clientSecret, tokenEndpoint } = require('./config')

// The auth module object.
const auth = {}

// @name getAccessToken
// @desc Makes a request for a token using client credentials.
auth.getAccessToken = function () {
  const deferred = Q.defer()

  // These are the parameters necessary for the OAuth 2.0 Client Credentials Grant Flow.
  // For more information, see Service to Service Calls Using Client Credentials (https://msdn.microsoft.com/library/azure/dn645543.aspx).
  const requestParams = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default'
  }

  // Make a request to the token issuing endpoint.
  request.post({ url: tokenEndpoint, form: requestParams }, (err, response, body) => {
    const parsedBody = JSON.parse(body)

    if (err) {
      deferred.reject(err)
    } else if (parsedBody.error) {
      deferred.reject(parsedBody.error_description)
    } else {
      // If successful, return the access token.
      deferred.resolve(parsedBody.access_token)
    }
  })

  return deferred.promise
}

module.exports = auth
