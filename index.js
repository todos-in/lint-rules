// TODO #5 use esm
// TODO #1 add tests

const metaInfo = require('./package.json')

module.exports = {
  meta: {
    name: metaInfo.name,
    version: metaInfo.version,
  },
  rules: {
    'no-todos-without-issue-ref': require('./rules/no-todos-without-issue-ref'),
    'current-feature-branch-issues':  require('./rules/current-feature-branch-issues'),  
  },
  configs: {
    recommended: {
      rules: {
        'todohub/no-todos-without-issue-ref': 'error',
        'todohub/current-feature-branch-issues': 'warn',
      },
    },
  },
}
