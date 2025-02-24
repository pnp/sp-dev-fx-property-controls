# Minimal Path to Awesome

The shortest way to prepare your local copy of the project for development and testing.

## Install prerequisites

Before you start contributing to this project, you will need Node.js. This project (current version 3.x) has been tested with the 18.x version of Node.js and the version of NPM that comes with it. You can use [Node Version Manager](https://github.com/nvm-sh/nvm) or [Node Version Switcher](https://github.com/jasongin/nvs) to switch between different versions of Node.js.

## Get the local version of the project

- fork this repository
- clone your fork
- in the command line, run the following commands:
  - run `npm install` to restore dependencies
  - `npm install -g gulp-cli` in order to run `gulp` commands (run `npm list -g gulp-cli` to check if already installed on your machine or not)
  - `gulp serve` to serve your project (or `npm run serve` if you want to use [`spfx-fast-serve`](https://github.com/s-KaiNet/spfx-fast-serve))
- Start making your changes

### Run the project locally

As this project embeds a SPFx solution, you have the ability to test all the property controls on your machine.

You can also debug them in any supported language, by running one of the following commands (for example in _french_):

- `gulp serve --locale=fr-fr`
- `npx fast-serve --locale=fr-fr` (if using `spfx-fast-serve`)

### Documentation

SharePoint Framework Property Controls uses [MkDocs](http://www.mkdocs.org) to publish documentation pages. See more information about installing MkDocs on your operating system at <http://www.mkdocs.org/#installation>.

Also, documentation uses custom MkDocs theme that should be installed as well. See [Material theme for MkDocs](https://squidfunk.github.io/mkdocs-material/). Currently, documentation is working with version 3.1.0.

Once you have MkDocs and Material theme installed on your machine, in the command line:

- run `cd ./docs/documentation` to change directory to where the manual pages are stored
- run `mkdocs serve` to start the local web server with MkDocs and view the documentation in the web browser

For documentation update, we suggest you to use IDE extensions to help you for the writing process. For example, if you're using VS Code, you can install [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) for words spelling and [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) or [learn-markdown](https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-markdown) for Markdown syntax.

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/mpa)
