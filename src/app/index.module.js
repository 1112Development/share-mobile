import constants  from './config/app.constants.js';
import config from './index.config';
import routerConfig from './index.route';
import runBlock from './index.run';
import HomeConfig from './components/home/home.config';
import Controllers from './index.controller';

angular.module('ShareMobile', ['ionic', 'ui.router', 'ngCordova',Controllers.name])
    .constant('AppConstants', constants)
    .config(config)
    .config(routerConfig)
    .config(HomeConfig)
    .run(runBlock);

