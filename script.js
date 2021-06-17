const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let imagesLoaded =0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'xFiXegP5jElrpHdBRHdJYie_VjRXl83pCieAV4Df1Fc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=cats`;

// Check if all image are loaded
function imageLoaded(){
imagesLoaded++ ;
if(imagesLoaded === totalImages){
    ready = true;
    loader.hidden = true;
    }
}


// Helper function to Set Attributes on DOM elements
function setAttribute(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, Add to DOM
function displayphotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images = ', totalImages);
// Run function for each object in photoarray
    photosArray.forEach((photo) => {
// Create <a> to link to Unsplash
const item = document.createElement('a');
setAttribute(item,{
 href: photo.links.html,
 target: '_blank',
});
//Create <img> for photo
const img = document.createElement('img');
setAttribute(img,{
src: photo.urls.regular,
alt: photo.alt_description,
title: photo.alt_description,
});
img.addEventListener('load', imageLoaded);
item.appendChild(img);
imageContainer.appendChild(item);
});
}

// GET PHOTOS FROM Unsplash API
async function getPhotos(){
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();  
      displayphotos();
      
    } catch (error) {
        // Catch Error
    }
}

// Check to see if scrolling near bottom of the page
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
   
});

//On Load
getPhotos();