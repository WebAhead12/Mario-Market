const input = document.querySelector("#productInputs");
const button = document.querySelector(".buttonContainer");
const productSearch = document.querySelector(".products");
const product1 = document.querySelector(".prod1");
const product2 = document.querySelector(".prod2");
const product3 = document.querySelector(".prod3");
const product4 = document.querySelector(".prod4");
const product5 = document.querySelector(".prod5");
input.addEventListener("keyup", (event) => {
  fetch(`autocomplete/${input.value}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    //creates the profile picture and the followings
    .then((data) => {
      if (Object.keys(data).length == 0) {
        elDiv.textInput = "There is no such product";
        etabdiv.style.display = "none"; //lma etab tsme
      }
      else{
        for(let i = 0; i < Object.keys(data).length){
          product[i+1].textInput = data[i];
        }
      }
    });
});
productSearch.addEventListener("click", (event) => {
  console.log(event.target.innerHTML);
  input.value = event.target.innerHTML;
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
