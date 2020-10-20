# Getting started

## Installation

To get started you have to install the following dependency to your project: `@pnp/spfx-property-controls`.

Enter the following command to install the dependency to your project:

```console
npm install @pnp/spfx-property-controls --save --save-exact
```

## Configuration

Once the package is installed, you will have to configure the resource file of the property controls to be used in your project. You can do this by opening the `config/config.json` and adding the following line to the `localizedResources` property:

```json
"PropertyControlStrings": "./node_modules/@pnp/spfx-property-controls/lib/loc/{locale}.js"
```

## Next Steps

Once you have installed the dependency, you can start using the controls in your solution. Go to the documentation homepage to get an overview of all the available controls: [home](./).

![Hidden Telemetry](https://telemetry.sharepointpnp.com/sp-dev-fx-property-controls/wiki/GettingStarted)
