angular.module('CageStudioApp')
    .directive('binddetail', [function() {

        function link(scope, element, attrs) {
            var detail;

            function getDetail(obj) {}

            function updateDetail() {
                element.html(detail);
            }

            scope.$watch(attrs.binddetail, function(value) {
                detail = value.image + value.description;
                updateDetail();
            });

            element.on('$destroy', function() {
                element.text('');
            });
        }

        return {
            link: link
        };
    }]);