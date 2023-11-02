let count = 10;
let apiKey = "l7kTxXTSka2MaaMbu5pxJEXd81sho8CYoCCZFRXTCFE";
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
let photosArr = [];
let imgContainer = document.querySelector(".img-container");
let container = document.querySelector(".container");
// let loader = document.querySelector(".loading")

getPhotos();

async function getPhotos() {
  const response = await fetch(apiURL);
  photosArr = await response.json();
  // console.log(photosArr);
  displayPhotos();
}

function displayPhotos() {
  photosArr.forEach((photo) => {
    let heartClass = "fa-regular fa-heart"
    if(localStorage.getItem(photo.id)){
        if(localStorage.getItem(photo.id)=="true"){
            heartClass = "fa-solid fa-heart"
        }
        else{
            heartClass = "fa-regular fa-heart"

        }
    }
    const photoDiv = document.createElement("div");
    photoDiv.classList.add("photo-div");
    photoDiv.innerHTML = `
          <div class="photo-box">
              <a class="img-box" href="${photo.links.html}" target="_blank"><img src="${photo.urls.regular}" alt=""></a>
              <div class="icons">
                  <div class="like" onclick = "likeCheck('${photo.id}', event)">
                      <i class="${heartClass}" id="heart"></i>
                  </div>
                  <a class="download-img" href="${photo.links.download}" download target = _blank><i class="fa-regular fa-bookmark"></i></a>
              </div>
          </div>`;
    imgContainer.appendChild(photoDiv);
  });
}

function likeCheck(id, e) {
  if (e.target.className === "fa-regular fa-heart") {
    localStorage.setItem(id, true)
    e.target.className = "fa-solid fa-heart"
  } else {
    localStorage.setItem(id, false)
    e.target.className = "fa-regular fa-heart"
  }
}

// function downloadCheck(e) {
//     console.log(e.target);
//     if (e.target.innerHTML === '<i class="fa-regular fa-bookmark"></i>') {
//       e.target.innerHTML = '<i class="fa-solid fa-bookmark"></i>'
//     } else {
//       e.target.innerHTML = '<i class="fa-regular fa-bookmark"></i>'
//     }
//   }

container.addEventListener("scroll", (e) => {
  if (container.scrollTop + e.target.offsetHeight >= container.scrollHeight) {
    getPhotos();
  }
});
