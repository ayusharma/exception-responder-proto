onco.factory('PatientOne', function($http,$q){
  var def =  $q.defer();
  $http({method: 'GET', url: 'http://localhost/exception-responder-proto/app/webservice.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});


