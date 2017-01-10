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
                        templateUrl: 'pages/stock.html',
                        controller: 'itemCtrl'

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
//app.controller("signInController", ["$scope", "$routeParams", "$http", signInController]);//calling the login controller
app.controller("itemCtrl", ["$scope", "$http", itemCtrl]);

