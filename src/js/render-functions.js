import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function getHtmlImageList(iamgesList) {
  if (iamgesList.length <= 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      progressBar: false,
      transitionIn: 'fadeIn',
      position: 'topRight',
    });
    return 'no images found';
  } else {
    const htmlImagesList = iamgesList
      .map(
        image =>
          `<li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
              <img src="${image.webformatURL}" alt="${image.tags}" width="360" height="200">
            </a>
            <ul class="gallery-item-desc">
              <li class="gallery-item-desc-item"><span class="gallery-item-desc-cap">Likes</span><span>${image.likes}</span></li>
              <li class="gallery-item-desc-item"><span class="gallery-item-desc-cap">Views</span><span>${image.views}</span></li>
              <li class="gallery-item-desc-item"><span class="gallery-item-desc-cap">Comments</span><span>${image.comments}</span></li>
              <li class="gallery-item-desc-item"><span class="gallery-item-desc-cap">Downloads</span><span>${image.downloads}</span></li>
            </ul>
          </li>`
      )
      .join('');
    return htmlImagesList;
  }
}
export function renderGallery(htmlImageList, galleryList) {
  galleryList.insertAdjacentHTML('beforeend', htmlImageList);
}