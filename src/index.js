// index.js
document.addEventListener("DOMContentLoaded", () => {
// JEWELRY CLICK+DISPLAY IN FEATURE FUNCTION
  const handleClick = (jewelry) => {
    const jewelryDetail = document.getElementById('jewelry-detail');
    const detailImage = jewelryDetail.querySelector('.detail-image');
    const detailName = jewelryDetail.querySelector('.name');
    const detailJewelry = jewelryDetail.querySelector('.jewelry-name');

    detailImage.src = jewelry.image;
    detailName.textContent = jewelry.name;
    detailJewelry.textContent = jewelry('.jewelry-name');
    
    const detailRating = document.getElementById('rating-display');
    const detailComment = document.getElementById('comment-display');

  detailRating.textContent = jewelry.rating;
  detailComment.textContent = jewelry.comment;

    console.log(`${jewelry.name} clicked`);
    };
  
  // JEWELRY SUBMIT FUNCTION
  const addSubmitListener = () => {
    const newJewelry = document.getElementById("new-jewelry");
    newRamen.addEventListener('submit', (e) => {
      e.preventDefault();
  
  const jewelryNew = {
    brand: document.getElementById('jewelry-brand').value,
    name: document.getElementById('jewelry-name').value,
    image: document.getElementById('new-image').value,
    rating: document.getElementById('new-rating').value,
    comment: document.getElementById('new-comment').value
  };

  fetch('http://localhost:3000/jewelry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jewelryNew)
  })
  .then(response => response.json())
  .then(newJewelry => {
    addJewelryToDOM(jewelryNew);
  });
});
};
// DISPALY JEWELRY IN JSON
  const displayJewelry = () => {
    fetch(`http://localhost:3000/jewelry`)
    .then((resp) => resp.json())
    .then((jewelryData) => {
      const jewelryBox = document.getElementById('jewelry-box');
      jewelryData.forEach(jewelry => {
        addJewelryToDOM(jewelry);
      })
    })

  const addJewelryToDOM = (jewelry) => {
    const jeweleryBox = document.getElementById('jewelry-box');
    const jewelryImg = document.createElement("img");
    jewelryImg.src = jewelry.image;
    jewelryImg.addEventListener("click", () => handleClick(jewelry));
    jewelryBox.appendChild(jewelryImg);
    };
  };

const main = () => {
  displayJewelry ()
  addSubmitListener ()
}

main ()