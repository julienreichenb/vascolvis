# colvis-client
This library is a VueJS plugin that allows the annotation of data visualizations produced by Vega, Vega-lite and rendered as SVG.

## About the ColVis project
ColVis is an academical project that allows analysts to annotate data visualizations. Technically, it consists of several libraries, including this one.

## Usage
### Requirements
- A VueJS application
- Vuetify used globally

### Installation
The ColVis project is still in active development and I do not plan to release it on NPM before the code reaches a decent matury level. In order to use colvis-client, you cannot rely on the NPM repository, but you can leverage the NPM's (or Yarn's) CLI to install the library almost as regular NPM package.
1. Download the latest version of colvis-client. You can clone it or download it manually from this repository.
2. Link colvis-client to NPM (or Yarn). 
3. Link back colvis-client to your project

```
// (in colvis-client directory)
yarn link // or npm link


// (in your project's directory)
yarn link 'colvis-client' // or npm link 'colvis-client'
```

### Setup
1. Import colvis-client in your project
2. Load Vuetify beforehand
3. Tell Vue to use Colvis along with the initialized Vuetify

```
import Vue from 'vue';
import Vuetify from 'vuetify';
import Colvis from 'colvis-client';

Vue.use(Vuetify, {...vuetify options});
Vue.use(Colvis, { Vuetify: Vuetify });
new Vue(
    ...
)
```

ColVis asks for a list of Vuetify components to be loaded in order to work:

- VLayout
- VForm
- VCombobox
- VAutocomplete
- VBtn
- VIcon
- VNavigationDrawer
- VCard
- VToolbar
- VCheckbox
- VStepper
- VStepperContent
- VStepperHeader
- VStepperStep
- VTextarea
- VTextField

In case you need help to initialize Vuetify, take a look at the [example's plugin file](https://gogs.vanhulst.one/Human-IST/colvis-client/src/master/example/src/plugins/vuetify.ts).

### Run the example of this repository
Please check [the dedicated page](https://gogs.vanhulst.one/Human-IST/colvis-client/src/master/example) to run the example.

## Development

### Structure of this repository
This repository was built through Vue CLI 3. Its structure is as follows:

- dist: distribution version of the library. Use these files in your project, though this should work automatically if you `import` or `require`.
- example: an example of working Colvis interface
- src: the main content of the library
    - assets: js, and potentially other files that are processed when building the app
        - utils: various js functions meant to be used by the plugin
    - components: the VueJS components that structure the app
        - input: all components related to the annotation-taking part of Colvis
        - (soon) retrieval: all components related to the display of the annotations taken by Colvis 
    - models: classes that are regularly used in the components
- tests: unit tests
- types: some type definitions for typescript

### Compiles and minifies for production
```
yarn run build-lib
```

### Run tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```