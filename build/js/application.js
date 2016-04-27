'use strict';

var app = angular.module('apilkacja', ['ui.router','ui.bootstrap']);


app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('menu', {
            url: '/menu',
            controller: 'menuCtrl',
            templateUrl: 'partials/menu.html'
             


        })
        .state('contact', {
            url: '/contact',
            controller: 'contactCtrl',
            templateUrl: 'partials/contact.html'
        })
        .state('orders', {
            url: '/orders',
            
                    controller: 'ordersCtrl',
                    templateUrl: 'partials/orders.html'
                    


        })
        .state('status', {
			url: '/status/:orderId', 
			controller: 'statusCtrl',
			templateUrl: 'partials/status.html'
            
		});

    $urlRouterProvider.otherwise('/menu');
});
