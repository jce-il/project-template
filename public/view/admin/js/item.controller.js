
function itemCtrl($scope, $http, $routeParams) {
	function showAllItems(){
 				$http.get('/itemCtrlServer/showAllItems')
                    .success(function(data){
                        $scope.items = data;
                        console.log("Succeed loading");
                    })
                    .error(function(data){
                        console.log("Error: "+data);
         			});
	}
	function addItem(){
		var name =
		var category =
		var subCategory =
		var description =
		var location =

  				$http.get('/itemCtrlServer/addItem')
                    .success(function(data){
                        $scope.items = data;
                        console.log("Succeed loading");
                    })
                    .error(function(data){
                        console.log("Error: "+data);
         });
    }
};
