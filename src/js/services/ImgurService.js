import axios from 'axios';

const imgurFetch = axios.create({
    baseURL: 'https://api.imgur.com/3/',
    timeout: 5000,
    headers: {'Authorization': 'Client-ID ee0283263459862'}
});

const GALLERY = 'polandball';

/**
 * Fetches all search results.
 * Search phrase can be empty, when you want to fetch all polandballs.
 * API: https://api.imgur.com/endpoints/gallery#gallery-search
 *
 * @param {string} query='' - search query
 * @param {number} page=0 - paging param
 * @param {string} sort='time' - sort param
 * @return {Promise} - search results
 */
function search(query = '', page = 0, sort = 'time') {
    if (query) {
        query = ' AND ' + query;
    }
    return imgurFetch.get(`gallery/search/${sort}/${page}/?q=${GALLERY}${query}`);
    //return imgurFetch.get(`gallery/r/${GALLERY}/${sort}/${window}/${page}`) - subreddit fetch
}

/**
 * Fetches single image from imgur.
 * API: https://api.imgur.com/endpoints/gallery#image
 *
 * @param {number|string} id - image id
 * @return {Promise}
 */
function fetchImage(id) {
    return imgurFetch.get(`image/${id}`);
}

/**
 * Fetches single album from imgur.
 * API: https://api.imgur.com/endpoints/gallery#gallery
 *
 * @param {number|string} id - album id
 * @return {Promise}
 */
function fetchAlbum(id) {
    return imgurFetch.get(`gallery/${id}`);
}

/**
 * Fetches comments from imgur.
 * API: https://api.imgur.com/endpoints/gallery#gallery-comments
 *
 * @param {number|string} parentId - album id
 * @return {Promise}
 */
function fetchComments(parentId) {
    return imgurFetch.get(`gallery/${parentId}/comments`);
}

export default {
    search,
    fetchImage,
    fetchAlbum,
    fetchComments,
}
