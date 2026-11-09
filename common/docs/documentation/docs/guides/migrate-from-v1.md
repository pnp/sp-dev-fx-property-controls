# Migrating from v1 to v2

Most of the controls have no breaking changes when moving from v1 to v2. However, some APIs were changed to make the library more stable and controls behavior more even.

Also, we've bumped up React and Fluent UI versions used in the library. It means you will need to update `package.json` file in your SPFx projects.

The below guide is an overview of what it takes to migrate from v1 to v2.  If we missed something, please let us know in the issues list so we can update the guide. Thanks!

## v2 Supports SharePoint Online Only

v2 of Reusable Controls is based on SharePoint Framework 1.11 and, as a result, does not support SharePoint on-premises. 

> **Important**: Please, use v1 if you plan to deploy your solution on-premises.

## React and Fluent UI versions

v2 of Reusable Controls uses React.js v16.8.5 and Fluent UI (Office UI Fabric React) v6.214.0.

Although it is not necessary to use the same modules' versions in your project, we highly recommend to update your solution accordingly:

```json
"dependencies": {
    // other dependencies
    "office-ui-fabric-react": "6.214.0",
    "react": "16.8.5",
    "react-dom": "16.8.5"
  },
  "devDependencies": {
    "@types/react": "16.8.8",
    "@types/react-dom": "16.8.3",
  },
```

The easiest way to upgrade SharePoint Framework solution is to use [Office365 CLI](https://pnp.github.io/office365-cli/cmd/spfx/project/project-upgrade/#spfx-project-upgrade) `spfx project upgrade` command.

## APIs Changes

...


![](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/MigrateFromV1)
