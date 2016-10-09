import constants  from './config/app.constants.js';

import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';



import HomeController from './components/home/home.controller.js';
import AddController from './components/add/add.controller.js';
import LoginController from './components/login/login.controller.js';
import ngMaterial from 'angular-material';




import './index.scss';

angular.module('ShareMobile', ['ionic', 'ui.router','ngMaterial'])
    .constant('AppConstants', constants)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .controller('AddController', AddController)
    .controller('HomeController', HomeController)
    .controller('LoginController', LoginController);
