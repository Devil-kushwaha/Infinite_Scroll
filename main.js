const imageContainer = document.querySelector('#image-container');
const loader = document.querySelector('#loader');

let photosArray = [];
let total_n_of_images =0;

// Check if each image is loaded
let n_of_img_Loaded=0;
let ready = false;
function imageLoaded(){
    n_of_img_Loaded++;

    if(n_of_img_Loaded === total_n_of_images){
        loader.hidden = true;
        ready =true;
    }
}

// Helper function to set attributes in element
function setAttributes(element, attributes)
{
    for(let key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Unsplash API
const count = 10;
const apiKey = '2agd5kBwQG_se5VuO0gMN_-9A975hes2-8AZFZEKCr0';
const apiUrl =  `https://api.unsplash.com/photos/?client_id=${apiKey}&count=${count}`;

// Create Elements For Links and Photos
function displayPhotos(){
        total_n_of_images=photosArray.length;
        n_of_img_Loaded=0;
        photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        let itemAttributes = {
            href : photo.links.html,
            target : '_blank'
        }   ; 
        // Setting Attributes to Element
        setAttributes(item, itemAttributes);
        // Create image for photo
        const img = document.createElement('img');
        let imgAttributes = {
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,
        }
        setAttributes(img, imgAttributes);
        // Check if image is loaded
        img.addEventListener('load', imageLoaded);
        // Put Image inside <a>, then put inside image container
        item.appendChild(img);
        imageContainer.appendChild(item);

    });
}


// Get Photos from unsplash
async function getPhotos()
{
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        // Catch Error Here
    }
}


// Check to see if scrolling near th bottom of the page
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        console.log("Access Granted");
        getPhotos();
        ready=false;
    }
})

// On Load
getPhotos();