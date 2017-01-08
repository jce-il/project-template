function signInController($scope, $routeParams, $http) {

    $scope.session = {};

    $scope.signing = function (user) {
        console.log('in sign in');

        if ($scope.inForm.$valid) {

            console.log('after validation');
            $scope.user = angular.copy(user);

            $http.post('/userManage/signIn', $scope.user)
                .success(function (response) {

                    $scope.result = response;
                    if (response.in == true) {

                        $scope.session.user = response.user;

                        alert(response.msg);

                        document.getElementById("name").textContent = $scope.session.user.userName + " | ";


                        console.log('after login');
                        console.log($scope.session.user);


                        window.location.replace('#/home');


                    }
                    else if(response.user == null)
                    {
                        alert(response.msg);
                        window.location.replace('#/home');
                    }
                    else
                        alert(response.msg);

                    
                })
                .error(function (error) {
                    console.log('Error: ' + error);
                    console.log('HTTP: ' + $http);

                });
        }
    }
}
