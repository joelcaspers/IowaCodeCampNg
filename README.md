## IowaCodeCamp.com Front End ##

**IowaCodeCamp.com Angular** is the Iowa Code Camp website client side (Single Page Application) written using images, css, html, and javascript. 

### Javascript Dependencies ###

- Angular.js
- jQuery
- Angular UI Router (client side Single Page Application routing)

### Getting Started ###

[NPM](https://www.npmjs.com/) is used for package management. It runs and is packaged inside Node.js (platform/system build in javascript for network applications). 
[Install Node.js](http://nodejs.org/)

Open your shell and test you have Node.js installed with this command: `node -v`

Install the npm package globally so you can run the npm command from any directory in your shell: `npm install npm -g` (*you may need to prepend 'sudo' for unix based shells*)
 
Install the [Grunt](http://gruntjs.com/) command line interface (Grunt is a task runner used for a variety of source management tasks related to working with javascript files): `npm install -g grunt-cli`

Inside the root directory of the repository there is a package.json file defining the package for this project along with all of it's external dependencies/modules (mostly for local development - javascript libraries are being pulled from CDN's in index html file): `npm install`

Execute the grunt dev task (watcher for source changes - LiveReload plugin in chrome available): `grunt dev` Use `ctrl+c` to end the grunt process. 

> `grunt dev` task is setup to kick off a very lightweight server used to host the client side files.

`grunt` command concatenates the necessary source and builds the client side distributable (
> You can copy to a host server - modify module.js `API_ENDPOINT_URI_ROOT` constant and re-run grunt or grunt dev command, you may need to change the CORS settings in IowaCodeCampWebAPI project if you are moving location from localhost


SEE IowaCodeCampWebAPI project for starting/running REST API this application consumes.