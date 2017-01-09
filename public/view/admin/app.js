var app = angular.module("adminApp", ["ngRoute"]);

//routing
            app.config(function ($routeProvider) {
                $routeProvider
                  .when('/', {
                        templateUrl: 'pages/login.html',
                        controller: 'login.Controller.js',
                        controllerAs: 'vm',
                    })
                    .when('/dashboard', {
                        templateUrl: 'pages/dashboard.html'
                    })
                  .when('/orders', {
                      templateUrl: 'pages/orders.html'
                  })
                    .when('/stock', {
                        templateUrl: 'pages/stock.html'
                    })
                  .when('/newItem', {
                      templateUrl: 'pages/new_item.html'
                  })
                  .when('/statistics', {
                      templateUrl: 'pages/statistics.html'
                  })
                  .when('/users', {
                      templateUrl: 'pages/users.html'
                  })
                  
                  .otherwise({ redirectTo: 'pages/dashboard.html' });
            });

app.controller('mainController',function($scope, $http) {
	//$scope.formData = {};

    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    options.async = true;
});
    });
	// when landing on the page, get all todos and show them      
/*app.controller('itemCtrl', function ($scope) {
  $scope.items=[
  { index:'2', name:'m1' , category: 'plates',subCategory: 'circle' ,description: 'this is item 1',location:'1', color:'item1'},
  { index:'1', name:'item1' , category: 'plates',subCategory: 'circle' ,description: 'this is item 1',location:'1', color:'item1'},
  { index:'1', name:'item1' , category: 'plates',subCategory: 'circle' ,description: 'this is item 1',location:'1', color:'item1'},
  { index:'1', name:'item1' , category: 'plates',subCategory: 'circle' ,description: 'this is item 1',location:'1', color:'item1'},
    { index:'1', name:'item1' , category: 'plates',subCategory: 'circle' ,description: 'this is item 1',location:'1', color:'item1'},
    { index:'1', name:'item1' , category: 'cups',subCategory: 'paper' ,description: 'this is item 3',location:'1', color:'item1'},
    { index:'1', name:'item1' , category: 'plates',subCategory: 'Square' ,description: 'this is item 2',location:'1', color:'item1'},
    { index:'1', name:'item1' , category: 'plates',subCategory: 'circle' ,description: 'this is item 1',location:'1', color:'item1' }];
   // Model and View bindings
   // Small helper function not needed anywhere else
});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.todos = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
*/

app.controller('itemCtrl', function($scope, $http) {
    $http.get('item.controller/showAllItems')
   .success(function(data) {  
        $scope.items = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
});