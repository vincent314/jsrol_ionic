// TODO : extract classes

angular.module('jsrol.services', ['ngResource','jsrol.config']).factory('Events', function ($resource,config) {
    return $resource(config.jsrolRestBaseUrl + '/api/events/:id', {
        id: '@id'
    });
});