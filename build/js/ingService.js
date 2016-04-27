app.factory('ingSrv', ['$http', function($http) { 

        this.ingredients =[];
    return $http.get('/ingredients')
            .success(function(data) { 
              return data; 
            }) 
            .error(function(err) { 
              return err; 
            }); 
}]);