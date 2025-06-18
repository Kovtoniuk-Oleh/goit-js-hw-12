import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
let lightbox;

export function createGallery(images) {
  const markup = images.hits
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <a class="gallery-item" href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" />
        <div class="image-info">
          <div class="stat-item"><span class="stat-label">Likes</span><span class="stat-value">${likes}</span></div>
          <div class="stat-item"><span class="stat-label">Views</span><span class="stat-value">${views}</span></div>
          <div class="stat-item"><span class="stat-label">Comments</span><span class="stat-value">${comments}</span></div>
          <div class="stat-item"><span class="stat-label">Downloads</span><span class="stat-value">${downloads}</span></div>
        </div>
      </a>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a');
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').classList.add('visible');
}

export function hideLoader() {
  document.querySelector('.loader').classList.remove('visible');
}

export function showLoadMoreButton() {
  document.querySelector('.load-more').classList.remove('hidden');
}

export function hideLoadMoreButton() {
  document.querySelector('.load-more').classList.add('hidden');
}
