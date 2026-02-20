const productContainer = document.getElementById("productContainer");
const loading = document.getElementById("loading");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");

let products = [];

// Fetch products using async/await
async function fetchProducts() {
  try {
    loading.style.display = "block";

    const response = await fetch("products.json");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await response.json();
    displayProducts(products);
  } catch (error) {
    loading.innerText = "Unable to load products. Please try again later.";
  } finally {
    loading.style.display = "none";
  }
}

// Display products dynamically
function displayProducts(productList) {
  productContainer.innerHTML = "";

  productList.forEach(product => {
    const col = document.createElement("div");
    col.className = "col-lg-4 col-md-6";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${product.image}" class="card-img-top">
        <div class="card-body text-center">
          <h5>${product.title}</h5>
          <p class="text-muted">${product.category}</p>
          <p class="fw-bold">₹${product.price}</p>
        </div>
      </div>
    `;

    productContainer.appendChild(col);
  });
}

// Filter logic
function applyFilters() {
  let filteredProducts = [...products];

  const category = categoryFilter.value;
  const priceOrder = priceFilter.value;

  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      product => product.category === category
    );
  }

  if (priceOrder === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (priceOrder === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  displayProducts(filteredProducts);
}

// Event listeners
categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("change", applyFilters);

// Initial call
fetchProducts();
