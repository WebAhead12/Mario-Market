const input = document.querySelector("#productInputs");
const button = document.querySelector(".buttonContainer");
const productSearch = document.querySelector(".products");
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
          document.querySelector(`.product${i}`).style.display = "none";
          document.querySelector(`.product${i}`).textContent = "";
        }
      } else {
        for (let i = 0; i < SEARCH_DEFAULT; i++) {
          if (i < data.length) {
            document.querySelector(`.product${i}`).style.display = "block";
            document.querySelector(`.product${i}`).textContent = data[i];
          } else {
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
      document.querySelector(`.product${i}`).style.display = "none";
      document.querySelector(`.product${i}`).textContent = "";
    }
    return;
  }
  fetchAutoComplete();
});
productSearch.addEventListener("click", (event) => {
  console.log(event.target.innerHTML);
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
  fetch(`data/${inputSearch.value}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((results) => {
      //add the results to the screen
    });
});
