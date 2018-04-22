import alt from '../alt';
import ImgurService from '../services/ImgurService';

/**
 * Fetches and updates search results, and single images/albums.
 */
class ImagesActions {

    /**
     * Set fetched items to store.
     *
     * Dispatches UPDATE_ITEMS.
     *
     * @param {array} items - search results, contain images as well as albums, and who knows what else...
     * @param {string} query - search phrase
     * @param {number|string} page - pagination number
     * @return {{items: *, page: *, query: *}} - data to dispatch
     */
    updateItems(items, query, page) {
        return {items, page, query};
    }

    /**
     * Set single album.
     *
     * Dispatches SET_SINGLE_ALBUM.
     *
     * @param {object} item - single album fetched from some distant land.
     * @return {object} - that very album dispatched to the store.
     */
    setSingleAlbum(item) {
        return item;
    }

    /**
     * Set single image.
     *
     * Dispatches SET_SINGLE_IMAGE.
     *
     * @param {object} item - single image fetched from afar.
     * @return {object} - that very image dispatched and forgotten.
     */
    setSingleImage(item) {
        return item;
    }

    /**
     * Fetches album.
     *
     * @param {number|string} albumId - the id
     * @return {Promise} received from service
     */
    fetchAlbum(albumId) {
        return ImgurService.fetchAlbum(albumId)
            .then(response => {
                this.setSingleAlbum(response.data.data);
            })
            .catch(console.error)
    }

    /**
     * Fetches image, good doge.
     *
     * @param {number|string} albumId - the id
     * @return {Promise} received from service
     */
    fetchImage(imageId) {
        return ImgurService.fetchImage(imageId)
            .then(response => {
                this.setSingleImage(response.data.data);
            })
            .catch(console.error)
    }

    /**
     * Fetches search results. That includes all results == empty search.
     *
     * @param {string} query - search phrase, empty means all
     * @param {number|string} page - page of the results to fetch
     * @return {Promise} received from service
     */
    search(query, page) {
        return ImgurService.search(query, page)
            .then(response => {
                this.updateItems(response.data.data, query, page);
            })
            .catch(console.error)
    }
}

export default alt.createActions(ImagesActions);
