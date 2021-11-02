const input = document.querySelector(".productInputs");

input.addEventListener("keyup", (event) => {
  fetch(`data/${input.value}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    //creates the profile picture and the followings
    .then((data) => {});
});
