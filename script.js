let count = 10
let apiKey = "HYarpIO8etGPRsjwDbZzhN9oyW1b3YIh6AdXuGDNRb8";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
let photosArr =  [];
let imgContainer = document.querySelector('.container')

function setAttributes(element, attributes){
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos() {
    photosArr.forEach((photo)=>{
        const item = document.createElement("a");
        setAttributes(item , {
            href : photo.links.html,
            target : "_blank"
        })
        const img = document.createElement('img');
        setAttributes(img, {
            src : photo.urls.regular,
            alt : photo.alt_description
        })

        item.append(img)
        imgContainer.appendChild(item);
    })
}

async function getPhotos() {
    const response = await fetch(apiURL)
    photosArr = await response.json();
    console.log(photosArr);
    displayPhotos()
}
window.addEventListener("scroll", ()=>{
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        getPhotos()
    }
})
getPhotos()