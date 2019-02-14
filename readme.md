# GA Base Node template

This repository contains code for a skeleton NodeJS application using ExpressJS

## Package Manager

[Yarn](https://yarnpkg.com/lang/en/) is the package manager in use here. It can be installed on your local machine by visiting

* [Windows](https://yarnpkg.com/en/docs/install#windows-stable)
* [Mac OS](https://yarnpkg.com/en/docs/install#mac-stable)

After installing Yarn, you can run `yarn install` in the root folder to install dependencies.
Other Yarn basic commands can be found here [https://yarnpkg.com/en/docs/usage](https://yarnpkg.com/en/docs/usage)

## Integrated Development Environment

This template assumes that you're using [Visual Studio Code](https://code.visualstudio.com/) as your IDE.

The folder **.vscode** has two files

* __launch.json__ - Configuration Settings for the debugger.
* __settings.json__ - For some either IDE rules.

The folder **.vscode** should ideally be ignored in your **.gitignore** file.

## Linter

This Template builds off the [Airbnb Javascript Style Guide](https://github.com/airbnb/javascript). The definition is present
in the file **.eslintrc.json**.

The addition to this style guide is:

* Indents are 4 spaces instead of 2

The Visual Studio Code plugin [Beautify](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify) is used for code formatting. The file **.jsbeautifyrc** has rules for the _Beautify_ plugin to conform to the already defined Lint rules.

Also the npm package [Husky](https://www.npmjs.com/package/husky) is used to define a Precommit Hook to ensure that the Code Lint passes before a commit is made. The Precommit Hook is located in the **package.json** file.
