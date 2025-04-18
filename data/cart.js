export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

 export function addToCart(productId) {
   let matchingItem;

   cart.forEach((CartItem) => {
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
     cart.push({
       productId: productId,
       quantity: selectorQuantity,
       deliveryOptionId: '1'
     });
   }

   saveToStorage();
 }

 export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
 }

export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((CartItem) => {
    cartQuantity += CartItem.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQantity) {
  let matchingItem;
 cart.forEach((cartItem) => {
    if (productId === cartItem.productId){
      matchingItem = cartItem;
       matchingItem.quantity = newQantity;
       saveToStorage();
    }
 })
}

export function updateDeliveryOption(productId, deliveryOptionId) {
   let matchingItem;

   cart.forEach((cartItem) => {
     if (productId === cartItem.productId) {
       matchingItem = cartItem;
     }
   });

   matchingItem.deliveryOptionId = deliveryOptionId;

   saveToStorage();
}


 export async function loadCartFetch() {
  const promise = await fetch("https://supersimplebackend.dev/cart");
  const response = await promise.text();
  console.log(response);
}


export function loadCart(fun) {
 const xhr = new XMLHttpRequest();

xhr.addEventListener('load', () => {
    console.log(xhr.response);


  fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}