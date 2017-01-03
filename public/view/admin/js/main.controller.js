


var App = angular.module("adminApp", ["ngRoute"]);
//routing
            App.config(function ($routeProvider) {
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

function mainController($scope, $http) {
	//$scope.formData = {};

    $.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
    options.async = true;
});
	// when landing on the page, get all todos and show them
	$http.get('/admin/stock')
        .success(function(data) {
			$scope.items = data;
            console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
        
/*
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
}
