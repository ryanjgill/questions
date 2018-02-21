const fs = require('fs')

module.exports = function (fileName) {
  fs.readFile(`./categories/${fileName}`, 'utf8', function(err, contents) {
    if (err) { console.error(err) }

    let rows = contents.split(/\r?\n/)
    let currentQuestion = {
      options: []
    }
  
    let data = rows.reduce((output, row, index) => {
      let firstChar = row.substr(0, 1)
      switch (firstChar) {
        case '':
          if (currentQuestion && currentQuestion.question) {
            output.push(currentQuestion)
          }
          currentQuestion = {
            options: []
          }
          break;
        case '#':
          // Question
          currentQuestion.question = row.split('#Q ').join('')
          break;
        case '^':
          // Answer
          currentQuestion.answer = row.split('^ ').join('')
          break;
        default:
          // A, B, C, D
          currentQuestion.options.push(row.split(`${firstChar} `).join(''))
      }
  
      return output
    }, [])
  
    fs.writeFile(`./output/${fileName}.json`, JSON.stringify(data, null, 2), 'utf8', _ => process.exit())
  })
}