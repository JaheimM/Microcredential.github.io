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

let index = 0;

// Carousel animation for available manga
function carousel() {
  let i;
  let x = document.getElementsByClassName("mangaSlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  index++;
  if (index > x.length) {
    index = 1;
  }
  x[index - 1].style.display = "block";
  setTimeout(carousel, 1500); // Change image every 1.5 seconds.
}

carousel();

// preloader js
window.addEventListener("load", () => {
  document.querySelector(".preloader").style.display = "none";
  document.querySelector(".main_screen-wrapper").style.display = "block";
});

let icon = document.querySelector(".container");

icon.addEventListener("click", () => {
  icon.classList.toggle("change");
});

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
    localStorage.setItem("totalPrice", itemsInfo.price);
  }
}

function loadCartNum() {
  let itemNum = localStorage.getItem("cartNum");

  if (itemNum) {
    cartNums.textContent = itemNum;
  }
}

loadCartNum();

// Create an observer
const observer = new IntersectionObserver((entries) => {
  // looping over the array of entries and if intersecting property is true the element is visible
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //animation css classList
      // plays animation once container is in viewport
      entry.target.classList.add("about_animation");
      return;
    }

    entry.target.classList.remove("about_animation");
  });
});

// Observer will track this element's position
observer.observe(document.querySelector(".about"));
observer.observe(document.querySelector(".history"));

// Create an observer
const observer2 = new IntersectionObserver((entries) => {
  // looping over the array of entries and if intersecting property is true the element is visible
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      //animation css classList
      // plays animation once container is in viewport
      entry.target.classList.add("about_opacity");
      return;
    }

    entry.target.classList.remove("about_opacity");
  });
});

// Observer will track this element's position
observer.observe(document.querySelector(".about_container"));

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
