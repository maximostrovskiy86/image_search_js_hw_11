import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './js/const/refs';
import { renderImageToGallery } from './js/components/renderGallery';
import { smoothScroll } from './js/components/smoothScroll';
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

  fetchAllImage(searchQuery).then(({ hits, totalHits }) => {

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
  smoothScroll();
};


refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
