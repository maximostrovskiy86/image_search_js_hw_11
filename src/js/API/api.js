import { BASE_URL, KEY_API } from '../const/base';

export const fetchAllImage = (searchQuery) => {
    return fetch(`${BASE_URL}?key=${KEY_API}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)
}