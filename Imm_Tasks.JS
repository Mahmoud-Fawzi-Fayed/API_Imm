document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");

  const productsPerPage = 10;
  let currentPage = 1;
  let productsData = [];

  function createListItem(product) {
    const li = document.createElement("li");
    li.innerText = product.title;

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "edit";
    editButton.addEventListener("click", () => editItem(li, product));

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => deleteItem(li));

    li.appendChild(editButton);
    li.appendChild(deleteButton);

    productList.appendChild(li);
  }

  function editItem(li, product) {
    const newtitle = prompt("Enter the new title:", product.title);
    if (newtitle !== null && newtitle.trim() !== "") {
      product.title = newtitle;
      li.innerText = product.title;
    }
  }

  function deleteItem(li) {
    if (confirm("Are you sure you want to delete this item?")) {
      li.remove();
    }
  }

  function displayProducts() {
    productList.innerHTML = "";
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    
    for (let i = startIndex; i < endIndex; i++) {
      if (productsData[i]) {
        createListItem(productsData[i]);
      }
    }
  }

  function updatePaginationButtons() {
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage * productsPerPage >= productsData.length;
  }

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayProducts();
      updatePaginationButtons();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPage * productsPerPage < productsData.length) {
      currentPage++;
      displayProducts();
      updatePaginationButtons();
    }
  });

  fetch("https://dummyjson.com/products")
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data.products)) {
        productsData = data.products;
        displayProducts();
        updatePaginationButtons();
      } else {
        console.error("Products array not found in data:", data);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});




//array method , flat map
// const array = [2, 4, [22, "test"], false, null, {a: 2}, [22, "test"], "null"];

// function flat(data) {
//   if (typeof data === 'object') {
//     return Object.values(data).flatMap(flat);
//     //Map: It applies a function to each element of the array, and for each element, the function returns a new value.
//     //callback: A function that is applied to each element in the array. This function should return a new array or iterable.
//   } else {
//     return [data];
//   }
// }

// console.log(flat(array))
// const Dup = new Set(flat(array)).size !== array.length;
// console.log(Dup);