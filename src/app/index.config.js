function config ($logProvider, $compileProvider) {
  'ngInject';
  $logProvider.debugEnabled(true);
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|file|blob|cdvfile|content):|data:image\//)
}

export default config;
