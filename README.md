# TodoHub Lint Rules

This repository contains lint rules tailored for use with TodoHub, a GitHub Action designed to help you manage todos in your codebase by linking them to GitHub issues.

## Installation

The lint rules provided here are run standalone - linking todos to issues without tracking them tent to be error prone so. This is where todohub comes into place. You can find detailed instructions on how to set up TodoHub in the [TodoHub GitHub repository](https://github.com/todos-in/todohub).

Once TodoHub is set up in your project, you can integrate these lint rules by adding them to your linting configuration.

### Supported Linters

Currently, the lint rules in this repository are supported by the following linters:

- ESLint
- TSLint

### ESLint Configuration

To integrate these lint rules with ESLint, follow these steps:

1. Install the `eslint-plugin-todohub` package:

   ```bash
   npm install eslint-plugin-todohub --save-dev
   ```

2. Update your ESLint configuration (`.eslintrc.js` or `.eslintrc.json`) to include the `todohub/no-todos-without-issue-ref` rule:

   ```json
   {
     "plugins": ["todohub"],
     "rules": {
       "todohub/no-todos-without-issue-ref": "error"
     }
   }
   ```

### TSLint Configuration

To integrate these lint rules with TSLint, follow these steps:

1. Install the `tslint-plugin-todohub` package:

   ```bash
   npm install tslint-plugin-todohub --save-dev
   ```

2. Update your TSLint configuration (`tslint.json`) to include the `todohub/no-todos-without-issue-ref` rule:

   ```json
   {
     "rulesDirectory": ["tslint-plugin-todohub"],
     "rules": {
       "no-todos-without-issue-ref": true
     }
   }
   ```

## Available Rules

### 1. `no-todos-without-issue-ref`

This rule checks the codebase for todos that do not have an associated issue marker.

### 2. `no-todos-without-issue-ref-on-branch`

This rule, if your branches are named in the format `{issue_number}-issue-title`, warns for todos referencing the todos of the branch you have currently checked out.

## Contributing

Contributions to improve or extend these lint rules are welcome! Please follow the [Contribution Guidelines](CONTRIBUTING.md) when submitting pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
