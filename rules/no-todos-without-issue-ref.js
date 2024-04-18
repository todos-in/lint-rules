const git = require('../git')
const currentBranch = git.getCurrentBranchInfo()

const todoWithoutIssueRefRegex = /(?<keyword>TODO):?(?<whitespace>[^\S\r\n]+)(?<issue_ref>\(?#?[0-9]+\)?)?(?<todo_txt>.*)/gim

module.exports = {
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
  },
  create: function (context) {
    return {
      Program() {
        context.sourceCode.getAllComments().forEach(comment => {
          const matches = comment.value.matchAll(todoWithoutIssueRefRegex)
          // Currently, in multiline comment blocks, we are looking for all matches and we are reporting one error for the whole block without hint where exactly error occurred
          // The suggestion replaces all occurrences in the block and overrides the whole block
          // TODO #6 give more precise hints of occurrences + and allow fixing indiviual occurrences in a comment block

          // Find Todos in Comments which match the Regex but do NOT have an issue reference
          let firstTodoWithoutIssueRefMatch
          for (const match of matches) {
            if (match.groups && !match.groups['issue_ref']) {
              firstTodoWithoutIssueRefMatch = match
              break
            }
          }

          if (!firstTodoWithoutIssueRefMatch) {
            return
          }

          let suggestion = undefined
          if (currentBranch.isFeatureBranch) {
            suggestion = [{
              desc: `Reference the current branch's issue number (#${currentIssue}) in the TODO.`,
              fix: function (fixer) {
                let replaceSuggestion = comment.value.replaceAll(todoWithoutIssueRefRegex, (_match, keyword, whitespace, _issue_ref, todo_txt) =>
                  `${keyword}${whitespace}#${currentBranch.issueNumber} ${todo_txt}`)

                if (comment.type === 'Line') {
                  replaceSuggestion = `//${replaceSuggestion}`
                } else if (comment.type === 'Block') {
                  replaceSuggestion = `/*${replaceSuggestion}*/`
                }

                return fixer.replaceTextRange(comment.range, replaceSuggestion)
              }
            }]
          }
          let todoTxtShortened = firstTodoWithoutIssueRefMatch.groups['todo_txt'].substring(0, 32)
          if (todoTxtShortened.length < firstTodoWithoutIssueRefMatch.groups['todo_txt'].length) {
            todoTxtShortened += '...'
          }

          context.report({
            loc: comment.loc,
            message: `TODOs must reference an issue, such as: "${firstTodoWithoutIssueRefMatch.groups['keyword']} #${currentBranch.isFeatureBranch ? currentBranch.issueNumber : '15'} ${todoTxtShortened}"`,
            suggest: suggestion
          })
        })
      },
    }
  },
}