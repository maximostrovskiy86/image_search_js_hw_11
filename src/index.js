import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/const/refs';
import { fetchAllImage, incrementPage, resetPage } from './js/API/api';

let searchQuery = '';
const onClearDataFunction = () => {
  refs.gallery.innerHTML = '';
};

function onSearch(evt) {
  evt.preventDefault();
  resetPage();

  const form = evt.target;
  searchQuery = form.elements.searchQuery.value;

  if (!searchQuery) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }

  onClearDataFunction();

  getImage(searchQuery).then(({ hits, totalHits }) => {

    if (totalHits) {
      Notify.success(`Hooray! We found ${totalHits} images.`);
    }

    if (!hits.length) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
    }

    const page = incrementPage();

    if (page > 1 && hits.length >= 4) {
      refs.loadMoreBtn.textContent = 'Fetch more image';
      refs.loadMoreBtn.classList.remove('hidden');
    }

    return renderImageToGallery(hits);
  });

  evt.target.elements.searchQuery.value = '';
}

const getImage = async searchQuery => {
  try {
    const response = await fetchAllImage(searchQuery);
    return response.json();
  } catch (error) {
    console.log('ERROR', error);
  }
};

const onLoadMore = async () => {
  await fetchAllImage(searchQuery)
    .then(response => response.json())
    .then(({ hits }) => {

      if (hits.length < 6) {
        refs.loadMoreBtn.classList.add('hidden');
        Notify.warning('We\'re sorry, but you\'ve reached the end of search results\n');
      }

      return renderImageToGallery(hits);
    })
    .catch(err => console.log(err));

  incrementPage();

  setTimeout(() => {
    const element = refs.loadMoreBtn;
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, 0);
};

const renderImageToGallery = hits => {
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
};

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
