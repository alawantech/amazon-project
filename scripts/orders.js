import { orders } from "../data/orders.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { loadProductsFetch, products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { cart, saveToStorage } from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {renderOrderSummary} from './checkout/orderSummary.js'

document.querySelector(".js-orders-grid").innerHTML = ""; 

orders.forEach(async (order) => {
  let html = '';
  const orderId = order.id;
  const orderTime = dayjs(order.orderTime).format("MMMM, D");
  const totalCostCents = formatCurrency(order.totalCostCents);
  const products = order.products;
  const productsHtml = await productDetails(products, orderId);

html += `
    <div class="order-container">

      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${orderTime}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${totalCostCents}</div>
          </div>
        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${orderId}</div>
        </div>
      </div>
      ${productsHtml}
    </div>
  `;

  document.querySelector(".js-orders-grid")
   .innerHTML += html;
});


document.querySelector(".js-orders-grid").addEventListener("click", (event) => {
  if (event.target.classList.contains("js-buy-again")) {0
    const productId = event.target.dataset.productId;
   addToCart(productId);
   saveToStorage();
   window.location.href = 'checkout.html';
  }
});

async function productDetails(products, orderId) {
  let productHTML = '';
 for (const product of products) {
    const productId = product.productId;
    const quantity = product.quantity;
    const estimatedDeliveryTime = dayjs(product.estimatedDeliveryTime).format(
      "MMMM, D"
    );

  const matchingProduct = await getProductImage(productId);
    const productImage = matchingProduct.image;
    const productName = matchingProduct.name;

 productHTML += `
    <div class="order-details-grid">
        <div class="product-image-container">
          <img src="${productImage}">
        </div>

        <div class="product-details">
          <div class="product-name">
           ${productName}
          </div>
          <div class="product-delivery-date">
            ${estimatedDeliveryTime}
          </div>
          <div class="product-quantity">
            Quantity: ${quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again"
          data-product-id="${productId}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        

        <div class="product-actions">
          <a href="tracking.html?productId=${productId}&orderId=${orderId}">
            <button class="track-package-button button-secondary js-track-package-button">
              Track package
            </button>
          </a>
        </div>
      </div>
  `;

  }
  return productHTML;
}


async function getProductImage(productId) {
 await loadProductsFetch();
 let matchingProduct;
 products.forEach((product) => {
  if (productId === product.id) {
    matchingProduct = product;
  }
 });
 return matchingProduct;
}

function addToCart(productId) {

 let matchingItem;

 cart.forEach((item) => {
   if (productId === item.productId) {
     matchingItem = item;
   }
 });

 if (matchingItem) {
   matchingItem.quantity++;
 } else {
   cart.push({
     productId: productId,
     quantity: 1,
     deliveryOptionId: "1",
   });
 }
 saveToStorage();
}


