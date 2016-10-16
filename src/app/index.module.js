import constants  from './config/app.constants.js';

import config from './index.config';

import routerConfig from './index.route';

import runBlock from './index.run';

import PhotolistController from './locations/photolist/photolist.controller.js';
import PhotolistConfig from './locations/photolist/photolist.config.js';

angular.module('ShareMobile', ['ionic', 'ui.router', 'ngCordova'])
    .constant('AppConstants', constants)

    .config(config)
    .config(routerConfig)
    .config(PhotolistConfig)
    .run(runBlock)

    .controller('PhotolistController', PhotolistController);
