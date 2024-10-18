let addJewelry = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-jewelry-btn");
  const jewelryFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    
    addJewelry = !addJewelry;
    if (addJewelry) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});