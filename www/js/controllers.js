angular.module('jsrol.controllers', ['jsrol.services'])
    .controller('EventsCtrl', function ($scope, Events, $state) {
        Events.query({
            fromDate: moment().format()
        })
            .$promise
            .then(function (events) {
                $scope.events = events
            });

        $scope.eventClick = function (event) {
            $state.go('tab.details', {event: event});
        }
    })

    .controller('EventDetailsCtrl', function ($scope, $stateParams, $state) {
        $scope.event = $stateParams.event;
        $scope.loopClick = function (l,title) {
            console.log(l);
            $state.go('tab.map', {
                loop: l,
                title: title
            });
        };
    })

    .controller('TracksCtrl', function ($scope) {
    })

    .controller('MapCtrl', function ($scope, $stateParams, leafletData,config) {
        var loop =  $stateParams.loop;
        $scope.title = $stateParams.title;

        leafletData.getMap().then(function(map){
            var kmlLayer = omnivore.kml(config.jsrolRestBaseUrl + "/api/tracks/" + loop +"/kml").addTo(map);
            kmlLayer.on('ready', function () {
                map.fitBounds(kmlLayer.getBounds());
            });
        });
    });

