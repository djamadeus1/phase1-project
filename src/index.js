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
  detailJewelry.textContent = jewelry.brand; // Correct the property access

  const detailLikes = document.getElementById('like-display');
  // const detailComment = document.getElementById('comment-display');

  detailLikes.textContent = jewelry.likes;
  // detailComment.textContent = jewelry.comment;

  console.log(`${jewelry.name} ${jewelry.brand} clicked`);
};    
  // JEWELRY SUBMIT FUNCTION
  const addSubmitListener = () => {
    const newJewelry = document.getElementById("new-jewelry");
    newJewelry.addEventListener('submit', (e) => { // Correct the variable name
      e.preventDefault();
  
      const jewelryNew = {
        brand: document.getElementById('jewelry-brand').value,
        name: document.getElementById('new-name').value, // Correct the ID reference
        image: document.getElementById('new-image').value,
        likes: document.getElementById('new-likes').value,
        // comment: document.getElementById('new-comment').value
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
        addJewelryToDOM(newJewelry);
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
    });
  });
};

const addJewelryToDOM = (jewelry) => {
  const jewelryBox = document.getElementById('jewelry-box'); // Correct variable name
  const jewelryImg = document.createElement("img");
  jewelryImg.src = jewelry.image;
  jewelryImg.addEventListener("click", () => handleClick(jewelry));
  jewelryBox.appendChild(jewelryImg);
};

const main = () => {
  displayJewelry ()
  addSubmitListener ()
}

main ()
})