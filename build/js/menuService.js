app.factory('menuSrv', ['$http', function($http) { 
  return $http.get('/menu') 
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);
