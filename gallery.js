// creat app object
const galleryApp = {};
galleryApp.apiUrl = "https://api.unsplash.com/photos";
galleryApp.apiKey = "tqMPO2Xn82q1LSMhpCnr8dcZVEeroJuYLhGV7CQvNd4";
galleryApp.init = () => {
  console.log('app is running');
  galleryApp.getPhotos();
};
// create a method which will request information from the API
galleryApp.getPhotos = () => {
  // use the URL constructor to create our endpoint and specificy the parameters we want to include
  const url = new URL(galleryApp.apiUrl);
  const SEARCH_QUERY_URL = 'https://api.unsplash.com/search/photos'
  const searchQuery = 'food';
  const endpoint = `${SEARCH_QUERY_URL}?query=${searchQuery}&client_id=${galleryApp.apiKey}&orientation=squarish`;
  console.log({ endpoint })
  url.search = new URLSearchParams({
    // pass in our API key as a parameter
    client_id: galleryApp.apiKey
  });
  fetch(endpoint)
    .then((response) => {
      return response.json();
    })
    .then((jsonResponse) => {
      console.log(jsonResponse);
      galleryApp.displayPhotos(jsonResponse.results);
    });
};
// build a method that will display photos on the front-end
galleryApp.displayPhotos = (dataFromApi) => {
  // Target the element where we want to append our photos (gallery.ul)
  const ul = document.querySelector('.gallery');
  dataFromApi?.forEach((imageObject) => {
    // Create list item element
    const listElement = document.createElement('li');
    // Create img element
    const image = document.createElement('img');
    // Add src and alt attributes to our image
    image.src = imageObject.urls.regular;
    image.alt = imageObject.alt_description;
    // Append the image to its parents li.
    listElement.appendChild(image);
    // Append the list item into the gallery ul
    ul.appendChild(listElement);
  });
};
// call the init method to kick things off
galleryApp.init();