#DT Advisory Frontend

## Purpose of this repo

This repository aims to display live drilling data into graphical outputs called `widgets`.
Each widget will listen to a websocket using [SignalR](https://www.npmjs.com/package/@microsoft/signalr)

## State of this repo

DTAdvisory app relies on an outdated version of Material UI (and other dependencies). This created dependency conflicts with DrillAware. Given that DT Advisory was separated, but residing in the same monorepo.
DTAdvisory is currently a standalone application with its own isolated dependency tree and is no longer linked to any other modules in the repository.

⚠ The state of DTAdvisory's dependencies is considered technical debt and must be addressed urgently to restore security and maintain a healthy development workflow.

Until it is not resolved, it is impossible to use shared utilities that are used in drill-aware in this app as well. Including new version of advisory widgets.

# Getting Started

## Local development

1. Install dependencies by running `npm i --legacy-peer-deps` exactly this command.
2. Run with `npm run dev`
3. Go to `localhost:8080`
4. Go to `Settings` ("cog-wheel") and then to `Appearence and Notifications` tab
5. Select an operation/Wellbore to see some data

This operation will be set on the localestorage. So next time you don't have to set it.

## Local development with Rig release

Run `npm run start`

In your rig package run `docker-compose --profile advisory up --build --force-recreate` this will expose
endpoint `localhost:8080`

Go to `public/envConfigs.json` and change "baseApiUrl" to "http://localhost:8080", if not already

## Prerequisites

You must install nodejs and npm in order to setup the project: [Install nodejs](https://nodejs.org/en/download/), preferrably LTS

## Dependencies:

These are the main dependencies of this application. To see a full list of dependencies please see the `dependencies`
list in the `package.json` file.

- Application framework: [React](https://www.npmjs.com/package/react)
- Styling based on material design by Google: [mui](https://mui.com/)
  and [Emotion](https://www.npmjs.com/package/emotion)
- Websockets: [SignalR](https://www.npmjs.com/package/@microsoft/signalr)
- Graphical outputs: [Victory](https://www.npmjs.com/package/victory)

## CI pipelines

- the configuration file for CI is located at the root folder of this repo: `azure-pipelines.yml`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Bundle for production deployment
- `npm run serve` - Build & Start web server for web hosting
- `npm run test` - Run tests

## Config Environment Variables

### `envConfigs.json`

- the `envConfigs.json` file is at the root of the `public` folder and it is loaded when the application starts. It
  contains information about:
  - `baseApiUrl`: Backend URL
  - `disableAuthentication`: you can enable or disable authentication. When `false` the application will authenticate
    with msal with the configuration at the key `msal`
  - `msal`: [Microsoft Authentication Library (MSAL)](https://learn.microsoft.com/en-us/azure/active-directory/develop/msal-overview)
  - `telemetry`: configuration for application insights
  - `userConfiguration`: relates to all the default values of the user settings which are:
    - the application header
    - the default selected widget layout
    - the default widget layouts (which are read only)
    - the widget catalog: see further how to add a new widget

### Backend URL

To configure a compiled / built production app

In the `envConfigs.json` file, change value of `"baseApiUrl"` to your desired backend url

### Telemetry

If you need to seend application insights you can set it up by changing your `connectionString` in the `envConfigs.json`

- `connectionString`: Connection string of resource. Either this or instrumentationKey must be specified.

Here are some other properties that you can configure:

- `disableFetchTracking`: If true, Fetch requests are not autocollected. Default is false (Since 2.8.0, previously
  true).

- `loggingLevelTelemetry`: Telemetry logging level to instrumentation key. All logs with a severity evel higher than the
  configured level will sent as telemetry data to the configured instrumentation key.

  - 0: ALL iKey logging off

  - 1: logs to iKey: severity >= CRITICAL

  - 2: logs to iKey: severity >= WARNING

- `enableAutoRouteTracking`: Automatically track route changes in Single Page Applications (SPA). If true, each route
  change will send a new Pageview to Application Insights.

For more information about Application Insights can be
found [here](https://learn.microsoft.com/en-us/azure/azure-monitor/app/javascript-framework-extensions?tabs=react)

### Backend URL

- Development - [https://adv-api.sekd.cloudplatform.com](https://adv-api.sekd.cloudplatform.com)
- Staging - [https://adv-api.stage.cloudplatform.com](https://adv-api.stage.cloudplatform.com)

### Frontend URL

- Development - [https://adv.sekd.cloudplatform.com/](https://adv.sekd.cloudplatform.com/)
- Staging - [https://adv.stage.cloudplatform.com/](https://adv.stage.cloudplatform.com/)

### Notes on pixel units

- The application is based on relative units `rem` which will scale according to the root element `html` font-size.
- Victory API does not allow relative units so the widget under `VictoryChart` are using absolute pixels. In this case
  we use helpers in order to scale the pixels according to screen resolutions. Please see existing widgets and how they
  are used.
- `BaseWidget` is under `rem` units and most of the widgets are children of `BaseWidget`. Usually children
  of `BaseWidget` uses absolute pixels. Although there are some cases that we need to use mui/html components (which can
  use `rem` units). In this case we need to use viewport units (`vh`, `vw`, `vmin`, `vmax`) in order to make that
  component behave properly when user zooms in/out
