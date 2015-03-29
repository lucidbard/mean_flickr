'use strict';

//Photos service used to communicate Photos REST endpoints
angular.module('photos').factory('Photos', ['$resource',
	function($resource) {
		return $resource('photos/:photoId', { photoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
angular.module('photos').factory('ItemsService', ['$http','$rootScope', function($http, $rootScope) 
{
    var service={};

    service.saveItem = function(item, image)
    {

        var fd = new FormData();
        fd.append('file', image);
        fd.append('photo', JSON.stringify(item));
        $http.post('photos/', fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
            console.log('success add new item');
        })
        .error(function(e){
            console.log('error add new item', e);
        });


    };

    return service;

}

]);