onco.factory('PatientOne', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://localhost/exception-responder-proto/app/webservice.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('PatientTwo', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://localhost/exception-responder-proto/app/webservice2.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('PatientThree', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://localhost/exception-responder-proto/app/webservice3.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('PatientFour', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://localhost/exception-responder-proto/app/webservice4.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('PatientFive', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://localhost/exception-responder-proto/app/webservice.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('ExpRespOne', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://localhost/exception-responder-proto/app/webservice.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('ExpRespTwo', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://localhost/exception-responder-proto/app/webservice2.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('ExpRespThree', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://localhost/exception-responder-proto/app/webservice3.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('ExpRespFour', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://localhost/exception-responder-proto/app/webservice4.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('ExpRespFive', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://localhost/exception-responder-proto/app/webservice.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});


