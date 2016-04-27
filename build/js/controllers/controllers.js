
app.controller('PopupInstanceController',
    ['$scope','$modalInstance','pizza','ingSrv','cart','menuSrv',
        function ($scope, $modalInstance, pizza, ingSrv,cart,menuSrv) {
            
            $scope.extraIngredients = cart.extraIngredients;
            $scope.cart = cart.cart;
            $scope.extraIngredientsSum = cart.extraIngredientsSum;


            console.log(pizza.ingredients);

            $scope.pizza = pizza;
            $scope.close = function () {
                $modalInstance.dismiss('cancel');
            };
           /* menuSrv.success(function(data) {
                $scope.pizzaMenu = data;
            });*/
            ingSrv.success(function(data) {
                $scope.menuIngModal = data;
            });
          

//DODAJ USUŃ DODATKOWE SKŁADNIKI
            $scope.addIngredient = function(ing){
                cart.addIngredient(ing);
                console.log(cart.extraIngredients);
                console.log(cart.extraIngredientsSum());
            };
           
            $scope.removeIngredient = function($index){
                $scope.extraIngredients.splice($scope.extraIngredients.indexOf($index, 1));
            };
//DODAJ DO  KOSZKA
            $scope.addToCart = function(pizzaModal){
                cart.addToCart(pizzaModal);
                   $modalInstance.dismiss('cancel') ;
                
                console.log(cart);
            };
            
          $scope.extraIngSum = cart.extraIngredientsSum();
                
            
            
           
            
            $scope.totalSumCart = function(){
                cart.totalSumCart();
            };
            //SUMA MODALA - Dodatkowe składniki 
            
           /* $scope.extraIngSum = function(){
                cart.extraIngSum();
            };*/
    /*         $scope.extraIngSum = function() {
        var sum = 0;
        for (var i = 0; i < $scope.extraIngredients.length; i++) {
            var ing = $scope.extraIngredients[i];
            sum += ing.price;
        }

        return sum;
    };*/
        }
    ]
);
//MODAL 
app.controller('menuCtrl', ['$scope','$modal','$state','$stateParams','menuSrv','ingSrv','cart', function($scope,$modal,$state, $stateParams, menuSrv, ingSrv, cart) {

        $scope.open = function (pizza) {
            cart.extraIngredients = [];
            var customizationModal = $modal.open({
                templateUrl: 'partials/customPopup.html',
                controller: 'PopupInstanceController',
                resolve: {
                    pizza: function () {
                        return pizza;
                    }
                }
            });
        }



    //=============MENU z serwera pobrane w factory ========

menuSrv.success(function(data) {
        $scope.pizzaMenu = data;
    });
    
    ingSrv.success(function(data) {
        $scope.menuIng = data;
    });




    //====DODAWANIE DO KOSZYKA====
    
    $scope.cart = cart.cart;
    
    
    $scope.addToCart = function(pizza){
        cart.addToCart(pizza);
        
        console.log(cart);
    };
     //====SUMA KOSZYKA====
        $scope.cartSum = function() {
        var sum = 0;
        for (var c = 0; c < $scope.cart.length; c++) {
            var pizza = $scope.cart[c];
            sum += (pizza.price * pizza.quantity)+cart.extraIngredientsSum();
        }

        return sum;
    };
    
    //========ILOŚĆ W KOSZYKU ("item" jako pozycja w koszyku - USUWANIE, DODAWANIE, ODEJMOWANIE)======

    $scope.deleteInCart = function(item) {

        $scope.cart.splice($scope.cart.indexOf(item), 1);

    };
    
    
     $scope.incQty = function(item) {
        item.quantity = item.quantity + 1;
    };


    $scope.decQty = function(item) {

        if (item.quantity > 1) {
            item.quantity = item.quantity - 1;
        } else {
            $scope.deleteInCart(item);
        }

    };
    
    //====ZAKUP EKSPRESOWY=====
    
    $scope.expressOrder = function(pizza)	{
		cart.cart = [];
		cart.expressOrder(pizza);
		console.log(pizza);
        $state.go('orders');
	};
	
	$scope.finishOrder = function() {
		$state.go('orders');
		
	};
    
}]);


//================KONTAKT-KONTROLER==================

app.controller('contactCtrl', ['$scope', 'contactSrv', function($scope, contactSrv) {
    contactSrv.success(function(data) {
        $scope.contact = data;
    });

}]);
//================ZAMÓWIENIA-KONTROLER==================
app.controller('ordersCtrl', function($scope, $http, $state, $stateParams, cart) {

    $scope.cart = cart.cart;
    $scope.order = cart.orderReturn();
    $scope.client = {};
    
    //====SUMA KOSZYKA====
        $scope.cartSum = function() {
        var sum = 0;
        for (var c = 0; c < $scope.cart.length; c++) {
            var pizza = $scope.cart[c];
            sum += (pizza.price * pizza.quantity);
        }

        return sum;
    };
    
    
    //==ZAMÓWIENIE====
   
    $scope.orderFinish = function(infoObj){
        
        $scope.client = infoObj;
        
         $scope.orderFinal={
            order: [],
            orderInfo: {
                phone: $scope.client.phone,
                street: $scope.client.street,
                remarks: $scope.client.remarks
            },
            extras: []
        };
    
           for (var i=0; i<$scope.order.length ;i++){
            $scope.orderFinal.order.push({
                id: $scope.order[i].id,
                quantity: $scope.order[i].quantity
            })
        }
        
       $http.post('/order', ($scope.orderFinal))
            .success(function(response){
                $scope.res = JSON.parse(response.id);
                $state.go('status',{
                    orderId:$scope.res 
                });
            }).error(function(response){
                console.log("błąd"  + response);
            })
        
    };

});


//=============KONTROLER STATUS=======================
app.controller('statusCtrl', ['$scope','$http','$stateParams','cart', function($scope, $http, $stateParams, cart){
    
    $http.get("/order/"+$stateParams.orderId).success(function(response) 
	{
		$scope.ordered  = response.ordered;	
		$scope.estimated = response.estimated;	
		$scope.timeLeft = timeLeft(response.ordered, response.estimated);
	});

}]);
