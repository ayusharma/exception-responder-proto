onco.factory('PatientOne', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://30.0.0.156:8080/oncoblocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('PatientTwo', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://30.0.0.156:8080/oncoblocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('PatientThree', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://30.0.0.156:8080/oncoblocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('PatientFour', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://30.0.0.156:8080/oncoblocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('PatientFive', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://30.0.0.156:8080/oncoblocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('ExpRespOne', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://30.0.0.156:8080/oncoblocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('ExpRespTwo', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://30.0.0.156:8080/oncoblocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('ExpRespThree', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://30.0.0.156:8080/oncoblocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('ExpRespFour', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://30.0.0.156:8080/oncoblocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});

onco.factory('ExpRespFive', function($http,$q){
  var def =  $q.defer();

  $http({method: 'GET', url: 'http://30.0.0.156:8080/oncoblocks/webservice.do?query=get_patient_bundle'}).success(function(data){ def.resolve(data)})
  .error(function(error){
    alert("error: Data is not getting load from API");
  })

return def.promise;
});
