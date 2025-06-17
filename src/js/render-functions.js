import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const gallery = document.querySelector(".gallery");
let lightbox;

// export function createGallery(images) {
//   const markup = images
//     .map(
//       ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
//       <a class="gallery-item" href="${largeImageURL}">
//         <img src="${webformatURL}" alt="${tags}" />
        
//         <div class="info">
        
//           <p> Likes ${likes}</p>
//         <p> Views ${views}</p>
//         <p> Comments ${comments}</p>
//         <p> Downloads ${downloads}</p>

//         </div>
//       </a>`
//     )
//     .join("");

//   gallery.innerHTML = markup;
//   lightbox = new SimpleLightbox(".gallery a");
//   lightbox.refresh();
// }
export function createGallery(images) {
    const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <a class="gallery-item" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" />
        
        <div class="image-info">
          <div class="stat-item"><span class="stat-label"> Likes </span> <span class="stat-value">${likes}</span></div>
          <div class="stat-item"><span class="stat-label"> Views </span> <span class="stat-value">${views}</span></div>
          <div class="stat-item"><span class="stat-label"> Comments </span> <span class="stat-value">${comments}</span></div>
          <div class="stat-item"><span class="stat-label"> Downloads </span> <span class="stat-value">${downloads}</span></div>
        </div>
      </a>
    `).join("");
  
    gallery.innerHTML = markup;
    lightbox = new SimpleLightbox(".gallery a");
    lightbox.refresh();
  }
  


export function clearGallery() {
  gallery.innerHTML = "";
}

export function showLoader() {
    const loader = document.querySelector(".loader");
    console.log("Loader element:", loader); // Перевіряємо, чи знайшлося
    if (loader) {
      loader.classList.add("visible");
    } else {
      console.error("Loader element not found!");
    }
  }

export function hideLoader() {
  document.querySelector(".loader").classList.remove("visible");
}