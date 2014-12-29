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