import axios from 'axios';

const imgurFetch = axios.create({
    baseURL: 'https://api.imgur.com/3/',
    timeout: 5000,
    headers: {'Authorization': 'Client-ID ee0283263459862'}
});

const GALLERY = 'polandball';

//imgurFetch.get('/gallery/search/?q=polandball AND giant').then(
//        response => {
//            console.log(response);
//            return response;
//        });

export default {

    search(query = '', page = 0, sort = 'time') {
        if (query) {
            query = ' AND ' + query;
        }
        return imgurFetch.get(`gallery/search/${sort}/${page}/?q=${GALLERY}${query}`);
        //return imgurFetch.get(`gallery/r/${GALLERY}/${sort}/${window}/${page}`)
    },

    fetchImage(id) {
        return imgurFetch.get(`image/${id}`);
    },

    fetchAlbum(id) {
        return imgurFetch.get(`gallery/${id}`);
    },

    fetchComments(imgId) {
        return imgurFetch.get(`gallery/${imgId}/comments`);
    }
}
