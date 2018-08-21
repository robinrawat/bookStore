var myApp = angular.module('myApp');

myApp.controller('BooksController',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
	console.log('BooksController loaded...');

	$scope.getBooks = function(){
		$http.get('/api/books').success(function(response){
			$scope.books = response;
		});
	}
	$scope.getBook = function(){
		var id = $routeParams.id;
		$http.get('/api/books/'+id).success(function(response){
			$scope.book = response;
		});
	}
	$scope.addBook = function(){
		console.log($scope.book);
		$http.post('/api/books/', $scope.book).success(function(response){
			window.location.href='#/books';
		});
	}
	$scope.updateBook = function(){
		console.log($scope.book);
		var id = $routeParams.id;
		$http.put('/api/books/'+id, $scope.book).success(function(response){
			window.location.href='#/books';
		});
	}
	$scope.removeBook = function(id){
		$http.delete('/api/books/'+id).success(function(response){
			window.location.href='#/books';
		});
	}
}]);

myApp.controller('signupController',['$scope','$http','$location','$routeParams',function($scope,$http,$location,$routeParams){
	console.log('BooksController loaded...');

	$scope.addUser = function(){
		// console.log($scope.signup);
		$http.post('/api/signups/', $scope.signup).success(function(response){
			window.location.href='#/books';
		});
	}
	$scope.loginUser = function(){
		console.log($scope.login);
		$http.post('api/logins/',$scope.login).success(function(response){
			console.log('Success');
			window.location.href='#/books';
		});
	}
	// $scope.updateUser = function(){
	// 	console.log($scope.sign);
	// 	var id = $routeParams.id;
	// 	$http.put('/api/books/'+id, $scope.sign).success(function(response){
	// 		window.location.href='#/books';
	// 	});
	// }
	// $scope.removeUser = function(id){
	// 	$http.delete('/api/books/'+id).success(function(response){
	// 		window.location.href='#/books';
	// 	});
	// }
}]);