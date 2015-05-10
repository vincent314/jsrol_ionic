/* TODO : extract classes*/
angular.module('jsrol.controllers', ['jsrol.services'])
    .controller('EventsCtrl', function ($scope, Events, $state,$ionicPopup) {
        Events.query({
            fromDate: moment().format()
        })
            .$promise
            .then(function (events) {
                $scope.events = events;
            })
            .catch(function(err){
                console.log(JSON.stringify(err));
                $ionicPopup.alert({
                    title: 'Erreur',
                    template: JSON.stringify(err)
                });
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

        $scope.map = {
            defaults: {
                tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                maxZoom: 18,
                zoomControlPosition: 'topleft'
            },
            center : {
                lat: 50.62925,
                lng: 3.057256,
                zoom: 8
            }
        };

        leafletData.getMap().then(function(map){
            var kmlLayer = omnivore.kml(config.jsrolRestBaseUrl + "/api/tracks/" + loop +"/kml").addTo(map);
            kmlLayer.on('ready', function () {
                map.fitBounds(kmlLayer.getBounds());
            });
        });
    });

