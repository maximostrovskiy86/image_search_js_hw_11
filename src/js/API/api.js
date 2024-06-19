import { BASE_URL, KEY_API } from '../const/base';

// export const fetchAllImage = (searchQuery) => {
//     return fetch(`${BASE_URL}?key=${KEY_API}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=2&per_page=10`)
// }

export const fetchAllImage = (searchQuery) => {
  const params = new URLSearchParams({
    key: KEY_API,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 6,
  });

  return fetch(`${BASE_URL}?${params}`)
}


