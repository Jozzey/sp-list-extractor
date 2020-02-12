const rpn = require('request-promise-native')
const { siteId, listId } = require('./config')

// The graph module object.
const graph = {}

// @name getData
// @desc Makes a request to the Microsoft Graph for all the data in the specified list.
graph.getData = function (token) {
  return new Promise((resolve, reject) => {
    // Make a request to get  data from the list. Limited to a maximum of 1000 items
    // without &$top=1000 server-driven paging restricts the output to 200 items.
    rpn.get(`https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items?expand=fields&$top=1000`, {
      auth: {
        bearer: token
      }
    }).then(getBody, error)

    function getBody (body) {
      const parsedBody = JSON.parse(body)

      if (parsedBody.error) {
        return reject(parsedBody.error.message)
      } else {
        // The value of the body will be an array of the list data.
        return resolve(parsedBody.value)
      }
    }
    function error (err) {
      return reject(err)
    }
  })
}

module.exports = graph
