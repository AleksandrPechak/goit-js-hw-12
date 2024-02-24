import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import pixabayApi from './js/pixabay-api';
import { renderGallery, getHtmlImageList } from './js/render-functions';

const galleryList = document.querySelector('.gallery-list');
const queryToSearch = document.querySelector('.search-form-input');
const submitQuery = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-button');
const API_KEY = '42339402-872411b62d19180807500e657';

const pixabay = new pixabayApi(API_KEY);
const gallery = new SimpleLightbox('.gallery-list a', {
  captionDelay: 250,
  captionsData: 'alt',
});

async function searchImages(e) {
  e.preventDefault();
  galleryList.innerHTML = '';
  pixabay.currentPage = 1;
  pixabay.query = queryToSearch.value;
  toggleElementVisibility(loadMoreButton, false);
  if (isValidQuery(pixabay.query)) {
    queryToSearch.value = '';
    toggleElementVisibility(loader, true);
    const imageList = await pixabay.getImageList();
    toggleElementVisibility(loader, false);
    if (imageList.length > 0) {
      const htmlImageList = getHtmlImageList(imageList);
      renderGallery(htmlImageList, galleryList);
      gallery.refresh();
      if (pixabay.totalPages > 1) {
        toggleElementVisibility(loadMoreButton, true);
      }
    } else {
      iziToast.info({
        message: 'No images found',
        progressBar: false,
        transitionIn: 'fadeIn',
        position: 'topRight',
      });
    }
    queryToSearch.value = '';
  } else {
    iziToast.error({
      message: 'Search attribute is not valid',
      progressBar: false,
      transitionIn: 'fadeIn',
      position: 'topRight',
    });
  }
}

async function loadMoreImages(e) {
  e.preventDefault();
  pixabay.currentPage += 1;
  toggleElementVisibility(loader, true);
  toggleElementVisibility(loadMoreButton, false);
  const imageList = await pixabay.getImageList();
  toggleElementVisibility(loader, false);
  const htmlImageList = getHtmlImageList(imageList);
  renderGallery(htmlImageList, galleryList);
  gallery.refresh();
  const listItemHeight = document.querySelector('.gallery-item');
  window.scrollBy({
    top: listItemHeight.getBoundingClientRect().height * 2,
    behavior: 'smooth',
  });
  if (pixabay.totalPages === pixabay.currentPage) {
    toggleElementVisibility(loadMoreButton, false);
    iziToast.info({
      message: `We're sorry, but you've reached the end of search results.`,
      progressBar: false,
      transitionIn: 'fadeIn',
      position: 'topRight',
    });
  } else {
    toggleElementVisibility(loadMoreButton, true);
  }
}

function isValidQuery(queryToSearch) {
  if (queryToSearch.trim() === '') {
    return false;
  } else {
    return true;
  }
}

function toggleElementVisibility(element, isVisible = false) {
  if (isVisible) {
    element.classList.remove('hidden');
  } else {
    element.classList.add('hidden');
  }
}

submitQuery.addEventListener('submit', searchImages);
loadMoreButton.addEventListener('click', loadMoreImages);