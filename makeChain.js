const fs = require('fs')
const path = require('path')

// Load in the lies.txt file
const lies = fs.readFileSync(path.join(__dirname, 'lies.txt'), 'utf8')
// Now I want to strip out all punctuation and make it all uppercase
// eslint-disable-next-line
let cleanLies = lies.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').toUpperCase()
// remove any single or double quotes
cleanLies = cleanLies.replace(/["']/g, '')

// Now I want to split the string into an array of words
const words = cleanLies.split(' ')
let firstWord = words[0]
let secondWord = words[1]
let thirdWord = words[2]
const chain = {}

// Now we are going to loop through the words array starting from the 4th word and going until the third from last
for (let i = 3; i < words.length - 3; i++) {
  // If the first word is not in the chain object, add it
  if (!chain[firstWord]) chain[firstWord] = {}
  // If the second word is not in the chain object, add it
  if (!chain[firstWord][secondWord]) chain[firstWord][secondWord] = []
  // Push the third word into the array for the second word
  chain[firstWord][secondWord].push(thirdWord)
  // Now we want to shift the words to the left
  firstWord = secondWord
  secondWord = thirdWord
  thirdWord = words[i + 1]
}
// Now save the file to the chain.json file
fs.writeFileSync(path.join(__dirname, 'chain.json'), JSON.stringify(chain, null, 2))
