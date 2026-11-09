# Minimal Path to Awesome

The shortest way to prepare your local copy of the project for development and testing.

## Install prerequisites

Use Node.js 22 (22.14.0 or later) and the version of npm that comes with it.
The v4 branch uses Rush with PNPM to manage the controls library and private
SPFx test app. Both packages use SPFx 1.23.2 and React 17. You can use
[Node Version Manager](https://github.com/nvm-sh/nvm) or
[Node Version Switcher](https://github.com/jasongin/nvs) to switch Node.js versions.

## Get the local version of the project

- fork this repository
- clone your fork
- in the command line, run the following commands:
  - run `node common/scripts/install-run-rush.js install` from the repository root
  - run `node common/scripts/install-run-rush.js rebuild` to build both packages in dependency order
  - run `node --test common/tests/*.test.cjs` to verify the npm package, package boundaries and registry portability
  - run `cd apps/property-controls-tests` followed by `npm run start` to serve the test web part
- Start making your changes

### Run the project locally

Controls, shared services and localization live in `libraries/spfx-property-controls`.
The private test app lives in `apps/property-controls-tests` and imports the
library through `@pnp/spfx-property-controls/lib/...`, not relative source paths.
Only the app produces a deployable `.sppkg`; the library is published to npm.

Build the library before starting the test app. After changing library code,
run `node common/scripts/install-run-rush.js build` from the repository root.
The library build also copies localization resources to `lib/loc`.

When modifying package dependencies, run `node common/scripts/install-run-rush.js update`
and commit `common/config/rush/pnpm-lock.yaml` with the package manifests. Do not
run `npm install` inside the packages or create per-package lockfiles.

SPFx, React, ReactDOM and React typings are library peer dependencies, with
matching development dependencies for local builds. The test app supplies these
dependencies. Control-specific packages remain library dependencies.

Run `npm run changelog` or `npm run versionUpdater` from
`libraries/spfx-property-controls`. The changelog command also updates the
shared documentation's release notes.

You can also debug them in any supported language, by running one of the following commands (for example in _french_):

- `npm run start -- --locale=fr-fr` from `apps/property-controls-tests`

### Documentation

SharePoint Framework Property Controls uses [MkDocs](http://www.mkdocs.org) to publish documentation pages. See more information about installing MkDocs on your operating system at <http://www.mkdocs.org/#installation>.

Also, documentation uses custom MkDocs theme that should be installed as well. See [Material theme for MkDocs](https://squidfunk.github.io/mkdocs-material/). Currently, documentation is working with version 3.1.0.

Once you have MkDocs and Material theme installed on your machine, in the command line:

- run `cd ./common/docs/documentation` from the repository root to change directory to where the manual pages are stored
- run `mkdocs serve` to start the local web server with MkDocs and view the documentation in the web browser

For documentation update, we suggest you to use IDE extensions to help you for the writing process. For example, if you're using VS Code, you can install [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) for words spelling and [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) or [learn-markdown](https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-markdown) for Markdown syntax.

![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/mpa)
