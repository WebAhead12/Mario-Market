const input = document.querySelector(".productInputs");
const button = document.querySelector(".search");
const productSearch = document.querySelector(".Products");
const resultsContainer = document.querySelector(".results");

const SEARCH_DEFAULT = 5; // ade ybyn bl suggested
//a function to see if autocoplete is optional and if not makes display of the products hidden
function fetchAutoComplete() {
  fetch(`autocomplete/${input.value}`)
    .then((response) => {
      console.log(response);
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })

    .then((data) => {
      console.log(data);
      //checks if there are any products with whats written in the input if data.length = 0 then
      //it hides the products div
      if (data.length == 0) {
        for (let i = 0; i < SEARCH_DEFAULT; i++) {
          document.querySelector(`.product${i}`).style.opacity = 0;
          document.querySelector(`.product${i}`).style.display = "none";
          document.querySelector(`.product${i}`).textContent = "";
        }
      } else {
        //if data.length > 0

        for (let i = 0; i < SEARCH_DEFAULT; i++) {
          //adds up to 5 search options
          if (i < data.length) {
            document.querySelector(`.product${i}`).style.opacity = 1;
            document.querySelector(`.product${i}`).style.display = "block";
            document.querySelector(`.product${i}`).textContent = data[i];
            //if the search options < 5 hides the rest
          } else {
            document.querySelector(`.product${i}`).style.opacity = 0;
            document.querySelector(`.product${i}`).style.display = "none";

            document.querySelector(`.product${i}`).textContent = "";
          }
        }
      }
    });
}
//whenever we use the input it hides all the results from before and runs the autocomplete
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
//when the serach one of the suggested searches is clicked it sets it to the search input
productSearch.addEventListener("click", (event) => {
  console.log(event.target.innerHTML);
  if (event.target == productSearch) {
    return;
  }

  input.value = event.target.innerHTML;
  fetchAutoComplete();
});
//when search button is clicked it fetched to the data which returns an object
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
      price.textContent = "Price: " + results.price + "$";
      image.src = `/assets/images/${results.image}`;
      console.log(image.src);

      resultsContainer.style.display = "block";
      resultsContainer.style.opacity = 1;
    });
});
