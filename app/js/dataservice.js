onco.factory('PatientOne', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://104.236.9.88:8080/OncoBlocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('PatientTwo', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://104.236.9.88:8080/OncoBlocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('PatientThree', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://104.236.9.88:8080/OncoBlocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('PatientFour', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://104.236.9.88:8080/OncoBlocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('PatientFive', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://104.236.9.88:8080/OncoBlocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('ExpRespOne', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://104.236.9.88:8080/OncoBlocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('ExpRespTwo', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://104.236.9.88:8080/OncoBlocks/webservice.do?query=get_patient_bundle'
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('ExpRespThree', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://104.236.9.88:8080/OncoBlocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('ExpRespFour', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://104.236.9.88:8080/OncoBlocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});

onco.factory('ExpRespFive', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://104.236.9.88:8080/OncoBlocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    console.log(error);
  })

return def.promise;
});


