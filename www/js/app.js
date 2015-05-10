angular.module('jsrol', ['ionic', 'jsrol.controllers', 'jsrol.services', 'leaflet-directive'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/tabs.html"
            })

            // Each tab has its own nav history stack:

            .state('tab.events', {
                url: '/events',
                views: {
                    'tab-events': {
                        templateUrl: 'templates/tab-events.html',
                        controller: 'EventsCtrl'
                    }
                }
            })

            .state('tab.details', {
                url: '/details',
                params: {event: null},
                views: {
                    'tab-events': {
                        templateUrl: 'templates/tab-event-details.html',
                        controller: 'EventDetailsCtrl'
                    }
                }
            })

            .state('tab.tracks', {
                url: '/tracks',
                views: {
                    'tab-tracks': {
                        templateUrl: 'templates/tab-tracks.html',
                        controller: 'TracksCtrl'
                    }
                }
            })

            .state('tab.map', {
                url: '/map/:loop',
                params: {
                    'loop': null,
                    'title': null
                },
                views: {
                    'tab-events': {
                        templateUrl: 'templates/tab-map.html',
                        controller: 'MapCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/events');

    });
