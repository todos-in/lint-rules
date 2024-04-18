const fs = require('node:fs')
const path = require('node:path')
const { EOL } = require('os')

const gitPath = path.join('.', '.git', 'HEAD')

let gitHEAD
try {
  // TODO search for git folder recursively in parents
  gitHEAD = fs.readFileSync(gitPath, 'utf8')
} catch (err) {
  console.debug('Not in a git folder. Cannot provide hints for TODOs referencing current feature-branch.')
}

const issueNumber = Number.parseInt(gitHEAD.split('/').pop()?.split('-')[0])
const isFeatureBranch = !Number.isNaN(issueNumber)

module.exports = {
  getCurrentBranchInfo: () => ({ issueNumber, isFeatureBranch })
}
