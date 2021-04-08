// Commonly used values
const access_token = '338148107599656';
const url = 'https://superheroapi.com/api.php/' + access_token + '/search/';

// main search event
const searchBar = document.getElementById('search-data');

async function searchHero(searchString) {

     // Calling API
     let response = await fetch(url + searchString, {
          credentials: 'omit'
     })
     if (response.ok) { // if HTTP-status is 200-299
          renderData(await response.json());
     }
     else {
          alert("HTTP-Error: " + response.status);
          console.log("Error");
     }
}

searchBar.addEventListener('keyup', (e) => {
     const searchString = e.target.value;
     console.log("Searching for: ", searchString);
     if (searchString.length < 2) {       // avoiding huge number of search results
          document.getElementById('results').innerHTML = 'Add atleast 3 characters';
     }
     else {
          searchHero(searchString);
     }
});

// Handling details, add favourite actions
document.addEventListener('click', (event) => {
     // Details button
     if (event.target.id == 'details_btn') {
          var id = event.target.parentNode.id;
          window.open('./details.html' + '?id=' + id, "_self");
     }
     
});

function renderData(data) {
     // Checking if there's anything found
     if (data.response == 'error' || data.results.length === 0) {
          document.getElementById('results').innerHTML = data.error;
     }
     else {
          // deleting previous results
          var results = document.getElementById('results');
          results.remove();

          // Creating new results
          var result_container = document.getElementById('result-container');
          var results = document.createElement('DIV');
          results.id = 'results';
          result_container.appendChild(results);

          // rendering each heroes
          data.results.forEach((element) => {
               results.appendChild(getCard(element));
          });
     }
}


function getCard(data) {
     // Card container
     var cardContainer = document.createElement('DIV');
     cardContainer.className = 'card-container center';
     cardContainer.id = data.id;
     cardContainer.innerHTML = `
        <div class="card-img-container">
            <img src="${data.image.url}">
        </div>
        <div id="details_btn" class="card-name">${data.name}</div>
    `
     return cardContainer;
}

// For changing visibility of alert box
function customAlert(type, message) {
     var element = document.getElementsByClassName(type);
     element[0].innerHTML = message;
     element[0].style.visibility = "visible"
     setTimeout(() => {
          element[0].style.visibility = "hidden";
     }, 1500);
}