const fs = require('node:fs')
const path = require('node:path')

const gitPath = path.join('.', '.git', 'HEAD')

let gitHEAD
try {
  // TODO #3 search for git folder recursively in parents
  gitHEAD = fs.readFileSync(gitPath, 'utf8')
} catch (err) {
  console.debug('Not in a git folder. Cannot provide hints for TODOs referencing current feature-branch.')
}

const issueNumber = gitHEAD && Number.parseInt(gitHEAD.split('/').pop()?.split('-')[0])
const isFeatureBranch = gitHEAD !== undefined && !Number.isNaN(issueNumber)

module.exports = {
  getCurrentBranchInfo: () => ({ issueNumber, isFeatureBranch })
}
