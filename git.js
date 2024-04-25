const fs = require('node:fs')
const path = require('node:path')

function findClosestGitFolder(directory) {
  let currentDir = directory;
  let parentDir = path.dirname(currentDir);

  // currentDir and parentDir are equal when root folder of system is reached
  do {
    const gitFolderPath = path.join(currentDir, '.git');

    if (fs.existsSync(gitFolderPath)) {
      return gitFolderPath;
    }

    currentDir = path.dirname(parentDir);
    parentDir = path.dirname(currentDir);
  } while (currentDir !== parentDir)

  return null;
}

const currentFolder = path.resolve('.')
const gitFolder = findClosestGitFolder(currentFolder);

if (gitFolder) {
  console.debug(`eslint-plugin-todohub: git-folder found at: ${gitFolder}`);
} else {
  console.debug(`eslint-plugin-todohub: Not in a git (sub)-folder: ${currentFolder}: Rule "current-feature-branch-issues" disabled.`);
}

module.exports = {
  getCurrentBranchInfo: () => {
    let issueNumber;
    let isFeatureBranch;

    if (gitFolder) {
      try {
        const gitHEAD = fs.readFileSync(path.join(gitFolder, 'HEAD'), 'utf8');
        issueNumber = gitHEAD && Number.parseInt(gitHEAD.split('/').pop()?.split('-')[0]);
        isFeatureBranch = gitHEAD !== undefined && !Number.isNaN(issueNumber);
      } catch (err) {
        console.error('eslint-plugin-todohub: Cannot read HEAD from .git folder.');
      }  
    }
    
    return { issueNumber, isFeatureBranch };
  }
}
