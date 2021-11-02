const input = document.querySelector(".productInputs");
const button = document.querySelector(".buttonContainer");
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
    });
});

button.addEventListener("click", () => {
  const inputSearch = input.value;
  input.value = "";
  if (inputSearch == "") {
    products.innerHTML = "";
    return;
  }
  fetch(`data/${inputSearch.value}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then({});
});
