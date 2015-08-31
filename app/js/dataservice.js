onco.factory('PatientOne', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'webservice.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('PatientTwo', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'webservice2.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('PatientThree', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'webservice3.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('PatientFour', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'webservice4.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('PatientFive', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'webservice5.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('ExpRespOne', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'webservice5.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('ExpRespTwo', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'webservice4.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('ExpRespThree', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'webservice3.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('ExpRespFour', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'webservice2.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('ExpRespFive', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'webservice.json'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});


