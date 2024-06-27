import { refs } from '../const/refs';
import SimpleLightbox from 'simplelightbox';

export function renderImageToGallery(hits) {
  const imageMarkup = hits
    .map(
      ({
         webformatURL,
         tags,
         likes,
         views,
         comments,
         downloads,
         largeImageURL,
       }) => {
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
      },
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', imageMarkup);

  let lightbox = new SimpleLightbox('.gallery a', {
    preloading: true,
    isAnimating: false,
    captionType: 'attr',
    captionsData: 'alt',
    captionPosition: 'top',
    captionDelay: 250,
  });

  lightbox.refresh();
}