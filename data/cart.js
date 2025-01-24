export const cart = [];


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
     });
   }
 }