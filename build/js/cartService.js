app.service('cart', function(){
    
    
    
	
	this.cart = [];
    this.extraIngredients=[];
	//this.extraIngredientsPrice = 0 ;
    
    this.totalSum = 0;
    
    
    
    
    
    this.addIngredient = function(ing){
		this.extraIngredients.push({
			id: ing.id,
			label: ing.label,
			price: ing.price
		});
	};
    
	this.addToCart = function(pizzaModal){
		this.cart.push({
			id: pizzaModal.id,
			name: pizzaModal.name,
			price: pizzaModal.price,
			ingredients: pizzaModal.ingredients.concat(this.extraIngredients),
            extraIngredient: this.extraIngredients,
			quantity: pizzaModal.quantity,
			totalPrice: pizzaModal.price
		});
	};
    
    this.expressOrder = function (pizzaOrder){
        this.cart.push({
			id: pizzaOrder.id,
			name: pizzaOrder.name,
			price: pizzaOrder.price,
			ingredients: pizzaOrder.ingredients,
			quantity: pizzaOrder.quantity,
			totalPrice: pizzaOrder.price*pizzaOrder.qauntity
		});
    };
    
    this.orderReturn = function(){
        return this.cart;
    };
    
    
      this.extraIngredientsSum = function () {
      var sum = 0;
        for (var i = 0; i < this.extraIngredients.length; i++) {
            var ing = this.extraIngredients[i];
            sum += ing.price;
        }

        return sum;
    };
    
  
    
 
});