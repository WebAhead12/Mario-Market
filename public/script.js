const input = document.querySelector(".productInputs");
const button = document.querySelector(".search");
const productSearch = document.querySelector(".Products");
const resultsContainer = document.querySelector(".results");

const SEARCH_DEFAULT = 5; // ade ybyn bl suggested

function fetchAutoComplete() {
  fetch(`autocomplete/${input.value}`)
    .then((response) => {
      console.log(response);
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    //creates the profile picture and the followings
    .then((data) => {
      console.log(data);
      if (data.length == 0) {
        for (let i = 0; i < SEARCH_DEFAULT; i++) {
          document.querySelector(`.product${i}`).style.opacity = 0;
          document.querySelector(`.product${i}`).style.display = "none";

          document.querySelector(`.product${i}`).textContent = "";
        }
      } else {
        for (let i = 0; i < SEARCH_DEFAULT; i++) {
          if (i < data.length) {
            document.querySelector(`.product${i}`).style.opacity = 1;
            document.querySelector(`.product${i}`).style.display = "block";

            document.querySelector(`.product${i}`).textContent = data[i];
          } else {
            document.querySelector(`.product${i}`).style.opacity = 0;
            document.querySelector(`.product${i}`).style.display = "none";

            document.querySelector(`.product${i}`).textContent = "";
          }
        }
      }
    });
}

input.addEventListener("keyup", (event) => {
  if (event.key == " ") return;
  if (input.value == "") {
    for (let i = 0; i < SEARCH_DEFAULT; i++) {
      document.querySelector(`.product${i}`).style.opacity = 0;
      document.querySelector(`.product${i}`).style.display = "none";

      document.querySelector(`.product${i}`).textContent = "";
    }
    return;
  }
  fetchAutoComplete();
});

productSearch.addEventListener("click", (event) => {
  console.log(event.target.innerHTML);
  if (event.target == productSearch) {
    return;
  }

  input.value = event.target.innerHTML;
  fetchAutoComplete();
});

button.addEventListener("click", () => {
  const inputSearch = input.value;
  input.value = "";
  if (inputSearch == "") {
    productSearch.innerHTML = "";
    return;
  }
  fetch(`data/${inputSearch}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    // the returned object
    // if object has no name log in has no name
    .then((results) => {
      let name = document.querySelector(".productName");
      let description = document.querySelector(".description");
      let price = document.querySelector(".price");
      let image = document.querySelector(".img");
      description.textContent = "Description: " + results.description;
      name.textContent = results.name;
      price.textContent = "Price: " + results.price;
      image.src = `/assets/images/${results.image}`;
      resultsContainer.style.display = "block";
      resultsContainer.style.opacity = 1;
    });
});
