import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProducsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';


async function loadPage() {
 try{
   // throw 'error1';

   await loadProducsFetch();

  const value = await new Promise((resolve, reject) => {
    //throw 'error2';
     loadCart(() => {
     // reject('error3');
       resolve('value3');
     });
   });

 } catch (error) {
  console.log("Unexpectected error. Please try again letter.");
 }

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
Promise.all([
 loadProducsFetch(),
  new Promise((resolve) => {
     loadCart(() => {
      resolve();
     });
  })

]).then((values) => {
  console.log(values);
   renderOrderSummary();
   renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });
}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
     loadCart(() => {
      resolve();
     });
  });

}).then(() => {
   renderOrderSummary();
   renderPaymentSummary();
});
*/


/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/
