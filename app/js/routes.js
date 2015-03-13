

bioJs.config(function($routeProvider){
	$routeProvider.when('/',{
		controller:'ac',
		templateUrl:'templates/dash.html'
	})
	.when('/v',{
		controller:'bc',
		templateUrl:'templates/view2.html'
	})

});