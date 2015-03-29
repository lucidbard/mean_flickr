'use strict';


angular.module('photos').controller('PhotosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Photos', 'ItemsService',
	function($scope, $stateParams, $location, Authentication, Photos,ItemsService) {
	  $scope.authentication = Authentication;
          $scope.uploadImage = function(){
            console.log($scope.image.files[0]);
          };

		// Create new Photo
		$scope.create = function() {
			// Create new Photo object
			var photo = new Photos ({
			  name: this.name
			});
                  ItemsService.saveItem(photo,$scope.image);
/*			// Redirect after save
			photo.$save(function(response) {
				$location.path('photos/' + response._id);

				// Clear form fields
				$scope.name = '';
                          $scope.image = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});*/
		};

		// Remove existing Photo
		$scope.remove = function(photo) {
			if ( photo ) { 
				photo.$remove();

				for (var i in $scope.photos) {
					if ($scope.photos [i] === photo) {
						$scope.photos.splice(i, 1);
					}
				}
			} else {
				$scope.photo.$remove(function() {
					$location.path('photos');
				});
			}
		};

		// Update existing Photo
		$scope.update = function() {
			var photo = $scope.photo;

			photo.$update(function() {
				$location.path('photos/' + photo._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Photos
		$scope.find = function() {
			$scope.photos = Photos.query();
		};

		// Find existing Photo
		$scope.findOne = function() {
			$scope.photo = Photos.get({ 
				photoId: $stateParams.photoId
			});
		};
	}
]);