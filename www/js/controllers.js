angular.module('jsrol.controllers', ['jsrol.services'])
    .controller('EventsCtrl', function ($scope,Events) {
        Events.query({
            fromDate: moment().format()
        })
            .$promise
            .then(function (events) {
                $scope.events = events
            });
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        }
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
