const productContainerEl = document.getElementById("productContainer");
const Url = "https://fakestoreapi.com/products";
const searchInputEl = document.getElementById("searchInput");

const fetchProduct = async () => {
  try {
    const response = await fetch(Url);
    const products = await response.json();

    const genrateProducts = (product) => {
      return `
          <div class="product_card">
                <div class="img_container">
                    <img src="${product.image}" alt="">
                </div>
                <div class="content">
                    <h2>${product.title}</h2>
                    <p>${product.description
                      .split(" ")
                      .slice(0, 20)
                      .join(" ")}</p>
              <button>${product.price}$</button>
                </div>
            </div>
        `;
    };

    const renderProducts = (productsToRender) => {
      productContainerEl.innerHTML = "";
      productsToRender.forEach((product) => {
        productContainerEl.innerHTML += genrateProducts(product);
      });
    };

    renderProducts(products);

    const filterHandler = (event) => {
      const searchText = event.target.value.toLowerCase();

      const filterproducts = products.filter((product) => {
        return product.title.toLowerCase().includes(searchText) ||
         product.description.toLowerCase().includes(searchText) ||
         product.title.toLowerCase().includes(searchText);
      });

      renderProducts(filterproducts);
    };

    searchInputEl.addEventListener("keyup", filterHandler);
  } catch (error) {
    return error;
  }
};


fetchProduct();