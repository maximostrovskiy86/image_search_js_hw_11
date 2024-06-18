import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { refs } from './js/const/refs';
import { fetchAllImage } from './js/API/api';

const onClearDataFunction = (e) => {
  refs.gallery.innerHTML = '';
}
function onSearch(evt) {
  evt.preventDefault();

  onClearDataFunction();

  const form= evt.target;
  let searchQuery = form.elements.searchQuery.value;

  getImage(searchQuery)
  .then(({hits}) => {
    if (!hits.length) {
      Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    }
    return renderImageToGallery(hits);
  })

  evt.target.elements.searchQuery.value = '';
}
export const getImage = async (searchQuery) => {
  try {
    const response = await fetchAllImage(searchQuery);
    return response.json();
  } catch (error) {
    console.log("ERROR", error);
  }
}

const renderImageToGallery = (hits) => {
  const imageMarkup =  hits.map(({webformatURL, tags, likes, views, comments, downloads, largeImageURL}) => {
    return `<div class="photo-card">
    <a class="thumb" href=${largeImageURL}>
      <img src=${webformatURL} alt=${tags} loading="lazy"/>
    </a>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${downloads}</b>
    </p>
    </div>
  </div>`;
  }).join('');

  refs.gallery.insertAdjacentHTML('beforeend', imageMarkup);

  let lightbox = new SimpleLightbox(".gallery a", {
    preloading: true,
    isAnimating: false,
    captionType: "attr",
    captionsData: "alt",
    captionPosition: "top",
    captionDelay: 250,
  });

  lightbox.refresh();
}


refs.form.addEventListener("submit", onSearch);