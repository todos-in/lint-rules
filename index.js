// TODO add recommended rule config to export object
// TODO use esm

module.exports = {
  meta: {
    name: 'eslint-plugin-todohub',
    version: "0.1.3",
  },
  rules: {
    'no-todos-without-issue-ref': require('./rules/no-todos-without-issue-ref'),
    'current-feature-branch-issues':  require('./rules/current-feature-branch-issues'),  
  }
}
