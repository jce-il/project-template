
function itemCtrl($scope, $http) {
	
 $scope.showAllItems=function(){
 $http.get('/itemCtrlServer/showAllItems')
                    .success(function(data){
                        $scope.items = data;
                        console.log("Succeed loading");
                    })
                    .error(function(data){
                        console.log("Error: "+data);
         });
}
 $scope.addItem=function(){
		var name =$scope.name; 
		var category =$scope.category;
		var subCategory =$scope.subCategory;
		var description =$scope.description;
		var location =$scope.location;

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
