import axios from 'axios';

const imgurFetch = axios.create({
    baseURL: 'https://api.imgur.com/3/',
    timeout: 1000,
    headers: {'Authorization': 'Client-ID ee0283263459862'}
});

const GALLERY = 'polandball';

//imgurFetch.get('/gallery/search/?q=polandball AND giant').then(
//        response => {
//            console.log(response);
//            return response;
//        });

export default {

    fetchPage(page = 1, sort = 'time', window = 'all') {
        return imgurFetch.get(`gallery/search/${sort}/${page}/?q=${GALLERY}`);
        //return imgurFetch.get(`gallery/r/${GALLERY}/${sort}/${window}/${page}`)
    },

    fetchImage(id) {
        return imgurFetch.get(`image/${id}`)
    },

    fetchComments(imgId) {
        return imgurFetch.get(`gallery//${imgId}/comments`)
    }
}
