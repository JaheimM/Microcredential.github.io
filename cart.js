/* 
copy and paste into seperate javascript because main.js has other data
*/

itemsInfo = [
  {
    name: "Chainsaw Man Vol: 10",
    tag: "chainsaw10",
    price: 9.99,
    quantity: 0,
  },
  {
    name: "Jujutsu Kaisen",
    tag: "jujutsu14",
    price: 8.99,
    quantity: 0,
  },
  {
    name: "Chainsaw Man Vol: 1",
    tag: "chainsaw1",
    price: 8.99,
    quantity: 0,
  },
  {
    name: "Chainsaw Man Vol: 11",
    tag: "chainsaw11",
    price: 8.99,
    quantity: 0,
  },
  {
    name: "Chainsaw Man Vol: 7",
    tag: "chainsaw17",
    price: 8.99,
    quantity: 0,
  },
  {
    name: "Chainsaw Man Vol: 3",
    tag: "chainsaw3",
    price: 8.99,
    quantity: 0,
  },
];

let addToCart = document.querySelectorAll(".add");
let cartNums = document.querySelector(".cart span");

// Loop that iterates for every item added to the bag
for (let i = 0; i < addToCart.length; i++) {
  addToCart[i].addEventListener("click", () => {
    // based on which button is clicked it will get corresponding information for the item
    cartNum(itemsInfo[i]);
    totalCost(itemsInfo[i]);
  });
}

// When website is loaded will append the current number of items in bag from previous local storage

function cartNum(itemsInfo) {
  let itemNum = localStorage.getItem("cartNum");

  itemNum = parseInt(itemNum);

  if (itemNum) {
    localStorage.setItem("cartNum", itemNum + 1);
    cartNums.textContent = itemNum + 1;
  } else {
    localStorage.setItem("cartNum", 1);
    cartNums.textContent = 1;
  }

  setItems(itemsInfo);
}

function setItems(itemsInfo) {
  let cartItems = localStorage.getItem("itemsInCart");
  cartItems = JSON.parse(cartItems);

  // if cart item already exists increase the quantity
  if (cartItems != null) {
    if (cartItems[itemsInfo.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [itemsInfo.tag]: itemsInfo,
      };
    }
    cartItems[itemsInfo.tag].quantity += 1;
  } else {
    itemsInfo.quantity = 1;
    cartItems = {
      [itemsInfo.tag]: itemsInfo,
    };
  }

  localStorage.setItem("itemsInCart", JSON.stringify(cartItems));
}

// Calculating total cost of all items in the cart
function totalCost(itemsInfo) {
  let itemsPrice = localStorage.getItem("totalPrice");

  console.log("The items price is", itemsPrice);

  if (itemsPrice != null) {
    itemsPrice = parseFloat(itemsPrice);
    localStorage.setItem("totalPrice", itemsPrice + itemsInfo.price);
  } else {
    itemsPrice = parseFloat(itemsPrice);
    localStorage.setItem("totalPrice", itemsInfo.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("itemsInCart");
  cartItems = JSON.parse(cartItems);

  let itemContainer = document.querySelector(".items_buy");
  let itemsPrice = localStorage.getItem("totalPrice");

  if (cartItems && itemContainer) {
    console.log("Works");
    itemContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      itemContainer.innerHTML += `
            <div class="items_buy">
            <i class="fa-solid fa-circle-xmark fa-1x"></i>
            <img src="images/${item.tag}.jpg">
            <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}</div>
            <div class="quantity"> 
            <i class="fa-solid fa-minus fa-sm"></i>
            <span>${item.quantity}</span>
            <i class="fa-solid fa-plus fa-sm"></i>
            </div>
            <div class="total">
            $${item.quantity * item.price}
            </div>
            `;
    });
    itemContainer.innerHTML += `
        <div class="cartTotalContainer"
            <h4 class="cartTotalTitle>
            Cart Total
            </h4>
            <h4 class="cartTotal">
            ${itemsPrice}
            </h4>
        `;
  }
}

function loadCartNum() {
  let itemNum = localStorage.getItem("cartNum");

  if (itemNum) {
    cartNums.textContent = itemNum;
  }
}

loadCartNum();
displayCart();

let hamburger = document.querySelector(".hamburger");
let hamburgerOff = document.querySelector(".fa-2x");

let mobileNav = document.querySelector(".mobile_nav");
let body = document.querySelector("body");

hamburger.addEventListener("click", () => {
  mobileNav.classList.add("on");
  body.classList.add("noScroll");
});

hamburgerOff.addEventListener("click", () => {
  mobileNav.classList.remove("on");
  body.classList.remove("noScroll");
});
