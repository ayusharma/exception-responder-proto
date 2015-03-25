

onco.config(function($routeProvider){
	$routeProvider
	.when('/',{
		controller:'HomeCtrl',
		templateUrl:'templates/home.html'
	})
	.when('/singlepatient',{
		controller:'DashboardCtrl',
		templateUrl:'templates/dash.html'
	})
	.when('/multiplepatient',{
		controller:'MultCtrl',
		templateUrl:'templates/view2.html'
	})
	.when('/insdel',{
		controller:'InsDelCtrl',
		templateUrl:'templates/insdel.html'
	})
	.when('/video',{
		controller:'InsDelCtrl',
		templateUrl:'templates/video.html'
	})
	.otherwise({
        redirectTo: '/'
      });

});