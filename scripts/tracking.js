import { orders } from "../data/orders.js";
import { loadProductsFetch, products } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { formatCurrency } from "./utils/money.js";

//console.log(products);
//console.log(orders);

//const url = new URL(window.location.href);
//console.log(url.searchParams.get('orderId'));
//console.log(url.searchParams.get('productId'));

const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");
const productId = url.searchParams.get("productId");
const matchingOrder = findOrder(orderId);
const matchingProduct = await getProductDetails(productId);
const estimatedDeliveryTime = dayjs(
  findDeliveryTime(matchingOrder.products)
).format("MMMM, D");
const productName = matchingProduct.name;
const productImage = matchingProduct.image;
const productQuantity = findQuantity(matchingOrder.products);

const tracking = dayjs(); // Keep it as a dayjs object
const orderTime = dayjs(matchingOrder.orderTime); // Convert order time to a dayjs object
const estimatedDeliveryTim = dayjs(findDeliveryTime(matchingOrder.products)); // Convert to dayjs object

const html = `
<div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${estimatedDeliveryTime}
    </div>

    <div class="product-info">
      ${productName}
    </div>

    <div class="product-info">
      Quantity: ${productQuantity}
    </div>

    <img class="product-image" src="${productImage}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar js-progress-bar"></div>
    </div>
  </div>
 `;
document.querySelector(".js-main").innerHTML = html;



const progressBar =
  (tracking.diff(orderTime, "day") /
    estimatedDeliveryTim.diff(orderTime, "day")) *
  100;

const progressBarElement = document.querySelector(".js-progress-bar");

if (progressBar <= 49) {
  progressBarElement.style.width = "20%";

} else if (progressBar <= 99 && progressBar >= 50) {
  progressBarElement.style.width = "50%";

}else if (progressBar >= 100) {
  progressBarElement.style.width = "100%";
}







function findOrder(orderId) {
  let matchingOrder;
  orders.forEach((order) => {
    if (orderId === order.id) {
      matchingOrder = order;
    }
  });
  return matchingOrder;
}

function findDeliveryTime(products) {
  let estimatedDeliveryTime;
  products.forEach((product) => {
    estimatedDeliveryTime = product.estimatedDeliveryTime;
  });
  return estimatedDeliveryTime;
}

function findQuantity(products) {
  let quantity;
  products.forEach((product) => {
    quantity = product.quantity;
  });
  return quantity;
}

async function getProductDetails(productId) {
  await loadProductsFetch();
  let matchingProduct;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}
