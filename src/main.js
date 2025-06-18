import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-box');
const loadMoreButton = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = searchInput.value.trim();
  currentPage = 1;

  if (!currentQuery) {
    iziToast.error({ message: 'Please enter a search term!' });
    return;
  }

  clearGallery();
  showLoader();
  hideLoadMoreButton();

  try {
    const images = await getImagesByQuery(currentQuery, currentPage);

    if (images.hits.length === 0) {
      iziToast.warning({
        message: 'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(images);

    if (images.totalHits > currentPage * 15) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({ message: 'Something went wrong. Please try again later.' });
    console.error(error);
  } finally {
    hideLoader();
    searchInput.value = '';
  }
});

loadMoreButton.addEventListener('click', async () => {
  currentPage++;
  showLoader();

  try {
    const images = await getImagesByQuery(currentQuery, currentPage);

    createGallery(images);

    if (images.totalHits <= currentPage * 15) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    // Прокрутка
    const firstCard = document.querySelector('.gallery-item');
    if (firstCard) {
      const { height } = firstCard.getBoundingClientRect();
      window.scrollBy({
        top: height * 2,
        behavior: 'smooth',
      });
    }

  } catch (error) {
    iziToast.error({ message: 'Failed to load more images.' });
    console.error(error);
  } finally {
    hideLoader();
  }
});
