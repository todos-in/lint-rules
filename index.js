// TODO #4 add recommended rule config to export object
// TODO #5 use esm

module.exports = {
  meta: {
    name: 'eslint-plugin-todohub',
    version: "0.1.6",
  },
  rules: {
    'no-todos-without-issue-ref': require('./rules/no-todos-without-issue-ref'),
    'current-feature-branch-issues':  require('./rules/current-feature-branch-issues'),  
  }
}
