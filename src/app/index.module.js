import constants  from './config/app.constants.js';

import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';

import HomeController from './components/home/home.controller.js';
import HomeConfig from './components/home/home.config.js';

angular.module('ShareMobile', ['ionic', 'ui.router', 'ngCordova'])
    .constant('AppConstants', constants)

    .config(config)
    .config(routerConfig)
    .config(HomeConfig)
    .run(runBlock)

    .controller('HomeController', HomeController);
