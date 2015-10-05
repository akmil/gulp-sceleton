/**
 * Created by Pavlo_Oliynyk on 10/2/2015.
 */
angular.module('compilation', [])
    .controller('testname',["$scope", "$rootScope", function($scope,$rootScope){
        $scope.hallo = 'hallo';
        $rootScope.log = 'logg';
    }])

    .directive('logCompile', ["$rootScope", function($rootScope) {
        $rootScope.log = '..';

        return {
            controller: ["$attrs", function($attrs) {
                $rootScope.log = $rootScope.log + ($attrs.logCompile + ' (controller)\n');
                //$rootScope.log = $rootScope.log + (' (controller)\n');
            }],
            compile: function compile(element, attributes) {
                $rootScope.log = $rootScope.log + (' (compile)\n');
                $rootScope.log = $rootScope.log + (attributes.logCompile + ' (compile)\n');
                return {
                    pre: function preLink(scope, element, attributes) {
                        $rootScope.log = $rootScope.log + (attributes.logCompile + ' (pre-link)\n');
                    },
                    post: function postLink(scope, element, attributes) {
                        element.prepend(attributes.logCompile);
                        $rootScope.log = $rootScope.log + (attributes.logCompile + ' (post-link)\n');
                    }
                };
            }
        };
    }])

    .directive('terminate',[ function() {
        return {
            terminal: true
        };
    }]);