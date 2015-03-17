

onco.config(function($routeProvider){
	$routeProvider
	.when('/',{
		controller:'HomeCtrl',
		template:'<h1>Home Page</h1>'
	})
	.when('/singlepatient',{
		controller:'DashboardCtrl',
		templateUrl:'templates/dash.html'
	})
	.when('/multiplepatient',{
		controller:'MultCtrl',
		templateUrl:'templates/view2.html'
	})

});