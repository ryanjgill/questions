const fs = require('fs')
const translate = require('./translate')

fs.readdir('./categories', (err, files) => {
  files.forEach(file => {
    translate(file)
  });
})