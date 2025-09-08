 // navbar mobile responsive link view
const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
});

// api section

const cardsContainer = document.getElementById("cards-container");
const categoriesContainer = document.getElementById("categories");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const cartItemsContainer = document.getElementById("cart-items");

let cart = {};

// Categories list
const categoryList = [
  { id: "all", name: "All Trees" },
  { id: 1, name: "Fruit Trees" },
  { id: 2, name: "Flowering Trees" },
  { id: 3, name: "Shade Trees" },
  { id: 4, name: "Medicinal Trees" },
  { id: 5, name: "Timber Trees" },
  { id: 6, name: "Evergreen Trees" },
  { id: 7, name: "Ornamental Plants" },
  { id: 8, name: "Bamboo" },
  { id: 9, name: "Climbers" },
  { id: 10, name: "Aquatic Plants" },
];

// Load Categories
function loadCategories() {
  categoryList.forEach((cat, index) => {
    const btn = document.createElement("button");
    btn.innerText = cat.name;
    btn.className = "category-btn px-3 py-2 rounded text-[#000000] transition-all duration-300 w-full md:w-[200px] text-left hover:bg-green-200";
    if (index === 0) btn.classList.add("bg-green-700", "text-white");

    btn.addEventListener("click", () => {
      setActiveButton(btn);
      if (cat.id === "all") loadAllPlants();
      else loadPlantsByCategory(cat.id);
    });

    categoriesContainer.appendChild(btn);
  });
}

// all plants
async function loadAllPlants() {
  try {
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    displayPlants(data.plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
  }
}

// plants by category
async function loadPlantsByCategory(id) {
  try {
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data = await res.json();
    displayPlants(data.plants);
  } catch (error) {
    console.error("Error fetching category plants:", error);
  }
}

// display plants
function displayPlants(plants) {
  cardsContainer.innerHTML = "";
  if (!plants || plants.length === 0) {
    cardsContainer.innerHTML = "<p>No plants found.</p>";
    return;
  }

  plants.forEach(plant => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md flex flex-col overflow-hidden transition hover:shadow-xl cursor-pointer w-full max-w-sm mx-auto h-[450px]";

    card.innerHTML = `
      <img src="${plant.image}" alt="${plant.name}" class="w-full h-48 sm:h-52 object-cover rounded-t-lg">
      <div class="flex-1 flex flex-col p-4 gap-2">
        <h1 class="font-semibold text-center text-lg">${plant.name}</h1>
        <p class="text-[12px] opacity-80 flex-1">${plant.description}</p>
        <div class="flex justify-between items-center mt-2 text-sm">
          <p class="bg-[#DCFCE7] rounded-2xl px-3 py-1">${plant.category}</p>
          <p><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</p>
        </div>
        <button class="w-full h-10 bg-[#166534] text-white rounded-full mt-2 hover:bg-green-500">Add to Cart</button>
      </div>
    `;

    const addToCartBtn = card.querySelector("button");
    addToCartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      addToCart(plant);
    });

    // modal view open
   card.addEventListener("click", e => {
  if (!e.target.closest("button")) {
    modalContent.innerHTML = `
      <h1 class="font-bold text-2xl mb-4">${plant.name}</h1>
      <img src="${plant.image}" alt="${plant.name}" class="w-full h-60 object-cover rounded-lg mb-4">
      <p><span class="font-semibold">Category:</span> ${plant.category}</p>
      <p><span class="font-semibold">Price:</span> ৳ ${plant.price}</p>
      <p><span class="font-semibold">Description:</span> ${plant.description}</p>
    `;
    modal.classList.remove("hidden");
  }
});

// close button
document.getElementById("closeModalInside").addEventListener("click", () => {
  modal.classList.add("hidden");
});

    cardsContainer.appendChild(card);
  });
}

// Add to Cart
function addToCart(plant) {
  if (cart[plant.id]) cart[plant.id].quantity += 1;
  else cart[plant.id] = { ...plant, quantity: 1 };
  
  updateCart();

  // alert
  alert(`${plant.name} has been added to your cart.`);
}
// Remove tree from cart
function removeFromCart(id) {
  if (cart[id]) {
    cart[id].quantity -= 1;
    if (cart[id].quantity <= 0) delete cart[id];
  }
  updateCart();
}

// cart update & Total money
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;
  const items = Object.values(cart);

  if (items.length === 0) {
    document.getElementById("cart-total").classList.add("hidden");
    return;
  }

  items.forEach(item => {
    total += item.price * item.quantity;

    const cartItem = document.createElement("div");
    cartItem.className = "flex justify-between items-center bg-[#DCFCE7] rounded-lg p-2";

    cartItem.innerHTML = `
      <div>
        <h1 class="font-semibold">${item.name}</h1>
        <p class="text-sm text-gray-700">৳ ${item.price} × ${item.quantity}</p>
      </div>
      <button class="text-red-500 font-bold text-lg">&times;</button>
    `;
    cartItem.querySelector("button").addEventListener("click", () => removeFromCart(item.id));
    cartItemsContainer.appendChild(cartItem);
  });

  document.getElementById("cart-total").classList.remove("hidden");
  document.getElementById("cart-amount").textContent = `৳ ${total}`;
}

// Active button 
function setActiveButton(activeBtn) {
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.classList.remove("bg-green-700", "text-white");
    btn.classList.add("text-[#000000]");
  });
  activeBtn.classList.add("bg-green-700", "text-white");
}

// Close modal view
document.getElementById("overlay").addEventListener("click", () => modal.classList.add("hidden"));

// Init
loadCategories();
loadAllPlants();

// form requirement
function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const trees = document.getElementById("trees").value;

    if (!name) {
      alert("Please enter your name");
      return false;
    }

    if (!email) {
      alert("Please enter your email");
      return false;
    }

    if (!trees) {
      alert("Please select number of trees");
      return false;
    }

    return true;
  }
