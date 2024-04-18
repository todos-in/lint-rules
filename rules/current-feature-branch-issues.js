const git = require('../git')
const currentBranch = git.getCurrentBranchInfo()

const todoWithCurrentIssueRegex = new RegExp(`(?<keyword>TODO):?[^\S\r\n]+(?<numberGroup>\\(?#?(?<issueNumber>${currentBranch.issueNumber})\\)?)(?<todoText>.*)`, 'i')

module.exports = {
  meta: {
    type: 'suggestion',
  },
  create: function (context) {
    return {
      Program() {
        if (!currentBranch.isFeatureBranch) {
          return
        }
        context.sourceCode.getAllComments().forEach(comment => {
          let lineNr = 0
          for (const line of comment.value.split(EOL)) {
            const match = line.match(todoWithCurrentIssueRegex)
            if (match) {
              // TODO #6 get exact location of TODO match, not comment start / end line
              context.report({
                loc: {
                  start: {
                    line: comment.loc.start.line + lineNr,
                    column: comment.type === 'Line' ? comment.loc.start.column + 2 : ((comment.type === 'Block' && lineNr === 0) ? 2 : 0)
                  },
                  end: {
                    line: comment.loc.start.line + lineNr,
                    column: comment.type === 'Line' ? comment.loc.end.column + 2 : line.length
                  }
                },
                message: match[0],
              })
            }
            lineNr++
          }
        })
      },
    }
  },
}