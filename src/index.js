document.addEventListener("DOMContentLoaded", () => {

  function toggleLikeDislike(button, jewelry, likeCountPar) {
    if (button.textContent === 'Like') {
      jewelry.likes++;
      button.textContent = 'Dislike';
    } else {
      jewelry.likes = Math.max(0, jewelry.likes - 1); // Ensure likes don't go below 0
      button.textContent = 'Like';
    }
    likeCountPar.textContent = `${jewelry.likes} Likes`;

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
  }

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
      toggleLikeDislike(likeButton, jewelry, detailLikes);
      event.preventDefault();
    };

    console.log(`${jewelry.name} ${jewelry.brand} clicked`);
  };

  function listenForLikeClick(likeButton, jewelry, likeCountPar) {
    likeButton.addEventListener('click', (event) => {
      toggleLikeDislike(likeButton, jewelry, likeCountPar);
      event.preventDefault();
    });
  }

  const addSubmitListener = () => {
    const newJewelry = document.getElementById("new-jewelry");
    newJewelry.addEventListener('submit', (e) => { 
      e.preventDefault();

      const jewelryNew = {
        name: document.getElementById('new-name').value,
        brand: document.getElementById('jewelry-type').value, 
        image: document.getElementById('new-image').value,
        likes: 0, 
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
      newJewelry.reset ()
    });
  };

// most liked function
  function displayMostLikedJewelry(jewelryData) {
  const mostLikedJewelry = jewelryData.reduce((max, jewelry) => {
    return jewelry.likes > max.likes ? jewelry : max;
  }, jewelryData[0]);

  handleClick(mostLikedJewelry);
}

  const displayJewelry = () => {
    fetch(`http://localhost:3000/jewelry`)
    .then((resp) => resp.json())
    .then((jewelryData) => {
      const jewelryBox = document.getElementById('jewelry-box');
      jewelryData.forEach(jewelry => {
        addJewelryToDOM(jewelry);
        displayMostLikedJewelry(jewelryData);
      });
    });
  };

  const addJewelryToDOM = (jewelry) => {
    const jewelryBox = document.getElementById('jewelry-box');

    const jewelryItem = document.createElement('div');
    jewelryItem.className = 'jewelry-item';

    const jewelryImg = document.createElement("img");
    jewelryImg.src = jewelry.image;
    jewelryImg.className = 'jewelry-image';
    jewelryImg.addEventListener("click", () => handleClick(jewelry));

     // Add mouseover event to jewelry image
     jewelryImg.addEventListener("mouseover", () => {
      console.log(`${jewelry.name} ${jewelry.brand} image mouseover`);
    });

    const likeButton = document.createElement('button');
    likeButton.className = 'like-button';
    likeButton.textContent = 'Like';

    // Add mouseover event to like button
    likeButton.addEventListener("mouseover", () => {
      console.log(`${jewelry.name} ${jewelry.brand} like button mouseover`);
    });

    const likeCountPar = document.createElement('p');
    likeCountPar.className = 'like-count';
    likeCountPar.textContent = `${jewelry.likes} Likes`;

    jewelryItem.appendChild(jewelryImg);
    jewelryItem.appendChild(likeButton);
    jewelryItem.appendChild(likeCountPar);

    jewelryBox.appendChild(jewelryItem);

    listenForLikeClick(likeButton, jewelry, likeCountPar);
  };

  const main = () => {
    displayJewelry();
    addSubmitListener();
  };

  main();
});