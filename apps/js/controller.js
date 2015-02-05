"use strict"

angular.module('CageStudioApp')
    .directive('binddetail', [function() {

        function link(scope, element, attrs) {
            var detail = "test";

            scope.$watch(attrs.binddetail, function(value) {
                element.html(detail);
            });

            element.on('$destroy', function() {
                //element.text('');
            });
        }

        return {
            link: link
        };
    }])
    .controller('IndexController', [
        '$scope',
        'cagelib',
        'routeManage',
        'winManage',
        'fireManage',
        function($scope, cagelib, routeManage, winManage, fireManage) {

            var tempFeed;

            $scope.addFeed = function() {
                var url = $scope.url;
                cagelib.getFeed(url, function(result) {
                    $scope.feeds.$add({
                        name: cagelib.getVal(result.channel, 'title').substring(0, 15),
                        url: url
                    });
                    $scope.url = "";
                })
            }

            $scope.setEdit = function(feed) {
                $scope.targetFeed = feed;
                tempFeed = {
                    name: feed.name,
                    url: feed.url
                }
            }

            $scope.setDelete = function(feed) {
                $scope.targetFeed = feed;
            }

            $scope.cancel = function() {
                $scope.targetFeed.name = tempFeed.name;
                $scope.targetFeed.url = tempFeed.url;
            }

            $scope.feeds = fireManage.getArray();
            $scope.jump = routeManage.jump;
            $scope.isActive = routeManage.isActive;
            $scope.close = winManage.close;
            $scope.minimize = winManage.minimize;
            $scope.maximize = winManage.maximize;
        }
    ])
    .controller('NewsController', [
        '$scope',
        'cagelib',
        'winManage',
        'fireManage',
        '$routeParams',
        function($scope, cagelib, winManage, fireManage, $routeParams) {
            var list = fireManage.getArray();

            $.AMUI.progress.start();
            $scope.list = [];

            var getList = function(url) {
                cagelib.getFeed(url, function(result) {
                    $.AMUI.progress.done();
                    $scope.list = cagelib.toArray(result.channel.item);
                    $scope.title = result.channel.title;
                })
            }

            list.$loaded().then(function() {

                if (!$routeParams.feedId) {
                    getList(list[0].url);
                    return;
                }
                var feed = list.$getRecord($routeParams.feedId);
                getList(feed.url);

            });

            $scope.show = function($event, $index) {
                if ($event) $event.preventDefault();
                $scope.article = $scope.list[$index];
            }

            $scope.getDetail = function(link) {
                winManage.open(link);
            }

        }
    ])
    .controller('MusicController', ['$scope', function($scope) {

    }])