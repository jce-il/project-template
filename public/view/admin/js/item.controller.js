var app = angular.module('item', []);


app.controller("itemCtrl", ["$scope", "showAllItems",
  function($scope, showAllItems) {
$scope.items = Item.showAllItems();  }
]);

