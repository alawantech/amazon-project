class Cart {
   cartItems;
   #localStorageKey;
   
   constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#laodFromStorage();
   }

   #laodFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }

    
    saveToStorage() {
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

     addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((CartItem) => {
        if (productId === CartItem.productId) {
          matchingItem = CartItem;
        }
      });

      document
        .querySelector(`.js-added-to-cart-${productId}`)
        .classList.add("js-added-to-cart");

      setTimeout(() => {
        document
          .querySelector(`.js-added-to-cart-${productId}`)
          .classList.remove("js-added-to-cart");
      }, 2000);

      const selectorElement = document.querySelector(
        `.js-quantity-selector-${productId}`
      );
      const selectorQuantity = Number(selectorElement.value);

      if (matchingItem) {
        matchingItem.quantity += selectorQuantity;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: selectorQuantity,
          deliveryOptionId: "1",
        });
      }

      this.saveToStorage();
    }

     removeFromCart(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });

      this.cartItems = newCart;
      this.saveToStorage();
    }

    calculateCartQuantity() {
      let cartQuantity = 0;

      this.cartItems.forEach((CartItem) => {
        cartQuantity += CartItem.quantity;
      });

      return cartQuantity;
    }

    
    updateQuantity(productId, newQantity) {
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
          matchingItem.quantity = newQantity;
          this.saveToStorage();
        }
      });
    }

     updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    }
}


 const cart = new Cart('cart-oop');
 const businesCart = new Cart('cart-business');

console.log(cart);
console.log(businesCart);
