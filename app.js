const auth = require('./auth')
const graph = require('./graph')
const { writeFile } = require('fs')

// Get an access token for the app.
auth.getAccessToken().then((token) => {
  // Get all of the data from the list.
  graph.getData(token)
    .then((data) => {
      // Write the list data to a file
      writeFile('data.json', JSON.stringify(data), (err) => {
        if (err) throw err
        console.log('Data saved!')
      })
    }, (error) => {
      console.error(`>>> Error getting list data: ${error}`)
    })
}, (error) => {
  console.error(`>>> Error getting access token: ${error}`)
})
