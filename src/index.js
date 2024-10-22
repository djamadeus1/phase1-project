// index.js
document.addEventListener("DOMContentLoaded", () => {
 
const handleClick = (jewelry) => {
  const jewelryDetail = document.getElementById('jewelry-detail');
  const detailImage = jewelryDetail.querySelector('.detail-image');
  const detailName = jewelryDetail.querySelector('.name');
  const detailJewelry = jewelryDetail.querySelector('.jewelry-name');
  const detailLikes = document.getElementById('like-display');
  const likeButton = document.getElementById('feature-like-button');

  detailImage.src = jewelry.image;
  detailName.textContent = jewelry.name;
  detailJewelry.textContent = jewelry.brand;
  detailLikes.textContent = `${jewelry.likes} Likes`;

  // Add event listener to the like button for the featured jewelry
  likeButton.onclick = (event) => {
    jewelry.likes++;
    detailLikes.textContent = `${jewelry.likes} Likes`;
    event.preventDefault();

    // Persist the updated likes to the server
    fetch(`http://localhost:3000/jewelry/${jewelry.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: jewelry.likes })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(updatedJewelry => {
      console.log(`Updated likes for ${updatedJewelry.name}: ${updatedJewelry.likes}`);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  console.log(`${jewelry.name} ${jewelry.brand} clicked`);
};

function listenForLikeClick(likeButton, jewelry, likeCountPar) {
  likeButton.addEventListener('click', (event) => {
    jewelry.likes++;
    likeCountPar.textContent = `${jewelry.likes} Likes`;
    likeButton.addEventListener('mouseover', () => {
      console.log(`${jewelry.name} ${jewelry.brand} like mouseover`);
    event.preventDefault();
    
    // Persist the updated likes to the server
    fetch(`http://localhost:3000/jewelry/${jewelry.id}`, {
      method: 'PATCH', // Use PATCH for updating
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ likes: jewelry.likes })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(updatedJewelry => {
      console.log(`Updated likes for ${updatedJewelry.name}: ${updatedJewelry.likes}`);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
    });
  });
}

// JEWELRY SUBMIT FUNCTION
  const addSubmitListener = () => {
    const newJewelry = document.getElementById("new-jewelry");
    newJewelry.addEventListener('submit', (e) => { 
      e.preventDefault();
  
      const jewelryNew = {
        name: document.getElementById('new-name').value,
        brand: document.getElementById('jewelry-type').value, 
        image: document.getElementById('new-image').value,
        likes: 0, 
        id: Math.floor(Math.random() * 10000) + 9
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
  const jewelryBox = document.getElementById('jewelry-box');

  // Create a container for each jewelry item
  const jewelryItem = document.createElement('div');
  jewelryItem.className = 'jewelry-item';

  // Create and configure the image element
  const jewelryImg = document.createElement("img");
  jewelryImg.src = jewelry.image;
  jewelryImg.className = 'jewelry-image';
  jewelryImg.addEventListener("click", () => handleClick(jewelry));

  // Create the like button
  const likeButton = document.createElement('button');
  likeButton.className = 'like-button';
  likeButton.textContent = 'Like';

  // Create the like count paragraph
  const likeCountPar = document.createElement('p');
  likeCountPar.className = 'like-count';
  likeCountPar.textContent = `${jewelry.likes} Likes`;

  // Append elements to the jewelry item container
  jewelryItem.appendChild(jewelryImg);
  jewelryItem.appendChild(likeButton);
  jewelryItem.appendChild(likeCountPar);

  // Append the jewelry item container to the jewelry box
  jewelryBox.appendChild(jewelryItem);

  // Attach the like button event listener
  listenForLikeClick(likeButton, jewelry, likeCountPar);
};

const main = () => {
  displayJewelry ()
  addSubmitListener ()
}

main ()
})