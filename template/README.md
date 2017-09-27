# {{ name }}

> {{ description }}

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
{{#unit}}

# run unit tests
npm run unit
{{/unit}}
{{#e2e}}

# run e2e tests
npm run e2e
{{/e2e}}
{{#if_or unit e2e}}

# run all tests
npm test
{{/if_or}}
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Production Setup

### Generate files

Type `npm run build`

This command creates a `dist` folder in the root directory. It will have 1 `index.html` and a `static` folder. The `static` folder contains 1 `js` folder and 1 `css` folder. 

### Wrap in PHP

Create an `index.php` in the `dist` folder. This `index.php` should have all the sessions and other credentials necessary to wrap around the generated files for GHCC admin. Currently, the `index.php` looks like this:

``` bash
<?php
// Load the database connection information
require_once('../../Connections/dbConection.php');
// Load the tNG classes
require_once('../../includes/tng/tNG.inc.php');
// Make unified connection variable
$conn_dbConection = new KT_connection($dbConection, $database_dbConection);

//Start Restrict Access To Page
$restrict = new tNG_RestrictAccess($conn_dbConection, "../");
//Grand Levels: Any
$restrict->Execute();
//End Restrict Access To Page
header('Access-Control-Allow-Origin: http://ghccdev.cchd.org');
header('Access-Control-Allow-Headers: X-Requested-With');
header( 'Access-Control-Allow-Headers: Authorization, Content-Type' );
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Credentials: true');
?>

<!DOCTYPE html><html><head><meta charset=utf-8><title>WalkAroundNV Admin</title><link rel=stylesheet href=https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css><link href=static/css/app.6847daa0b5fd83bdd3becb6b11ca3ebb.css rel=stylesheet></head><body><div id=app></div><script type=text/javascript src=static/js/manifest.4bc6365542a671affb5e.js></script><script type=text/javascript src=static/js/vendor.d9dff1e76f0dafa81ddb.js></script><script type=text/javascript src=static/js/app.2e1152ebe1cc20b6aeed.js></script></body></html>
```

There might be a directory change depending on the PHP server and where the `static` folder is located in that server.

## Common Components for GHCC admin projects

- [Vue Medium Editor](https://github.com/FranzSkuffka/vue-medium-editor)
- [MomentJS] (https://github.com/moment/moment)
- Google Maps version 3 (See NeonToNature Vue Admin
- `Datatable.vue` (Created in-house).

## Make a Page Component
The `page` directory inside the `src` directory is provided in this template.

### Create a Vue Component file

Make sure that the file ends in `.vue`. 

**Suggestion:** Please end the name of the file with `Page.vue` to differentiate it from other Vue components. An example is `ListPage.vue` or `DetailsPage.vue`. Although the other non-page components should be saved in the `components` folder, it's highly suggested to use this naming convention.

### Include in the Router file
It is highly recommended to give each page component a `path` and a `name` in the `router.js` file.

1. `import` the component in the area of the `router.js` file that is labeled as `Page components here`. This is just for organizational purposes.

2. In the `VueRouter` instance, an object with `routes` property is passed in. And, it is an array of objects. As you can see, each object is a configuration of each page component. Everything looks similar with the exception of the redirection configuration. Please make sure that you give a `name` property. This is the best way we can programmtically navigate to the page component. The `path` property is a way to put it in, for example, the `HeaderBar.vue` component.

