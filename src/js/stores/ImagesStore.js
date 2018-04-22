import ImagesActions from '../actions/ImagesActions';
import alt from '../alt';

/**
 * Images store.
 *
 * Holds image and album data.
 *
 * `items` stores search results, all consecutive pages
 * `imagesById` & `albumsById` stores search results in maps, split to images/albums (in case ids overlap)
 *
 * `currentPage` for infinite scroll,
 * `currentQuery` to know when to clear `items`,
 * `hasMore` to know whether to continue fetching
 *
 * and internal `alreadyDownloadedIds` to prevent downloading page in an infinite loop
 * (apparently imgur starts over with page-1 when there's no more pages)
 *
 */
export class ImagesStore {

    constructor() {
        this.items = [];
        this.albumsById = {};
        this.imagesById = {};
        this.alreadyDownloadedIds = {};
        this.hasMore = true;
        this.currentPage = 0;
        this.currentQuery = '';

        this.bindListeners({
            handleUpdateItems: ImagesActions.UPDATE_ITEMS,
            handleSetSingleAlbum: ImagesActions.SET_SINGLE_ALBUM,
            handleSetSingleImage: ImagesActions.SET_SINGLE_IMAGE
        });

        this.exportPublicMethods({
            getAlbumById: this.getAlbumById,
            getImageById: this.getImageById
        });
    }

    ///////////////private////////////////////////////////////////////////////////////////

    /**
     * Checks in stored ids if item was already downloaded during this search (as per `query`)
     *
     * @param {string|number} id
     * @return {boolean}
     * @private
     */
    _isItemAlreadyDownloaded(id) {
        return !!(this.alreadyDownloadedIds[id]);
    }

    /**
     * Determines if there's no more items do receive from remote server.
     * That is either items started repeating, or an empty page came.
     *
     * @param {array} items
     * @return {boolean}
     * @private
     */
    _noMoreImages(items = []) {
        if (items[0] && items[0].id) {
            return this._isItemAlreadyDownloaded(items[0].id);
        }
        return true;
    }

    /**
     * Store items by ids for easy retrieval and to keep track of received items, and make sure they don't start
     * repeating.
     *
     * @param {array} items - search results
     * @private
     */
    _storeByIds(items = []) {

        for (const item of items) {

            const storeMap = item.is_album ? this.albumsById : this.imagesById;

            storeMap[item.id] = storeMap[item.id] || item;

            this.alreadyDownloadedIds[item.id] = 1;
        }
    }

    ///////////////actions listeners///////////////////////////////////////////////////////

    /**
     * Listens to: `ImagesActions.UPDATE_ITEMS`.
     * Stores received items. Sets `state.hasMore` to `false` when last page of results reached.
     *
     * If query changed since last update, clears storage before holding new page.
     *
     * @param {number|string} page=1 - page that has been asked by the fetch service
     * @param {array} items - results
     * @param {string} query - search phrase used
     */
    handleUpdateItems({page = 1, items = [], query = ''}) {

        if (query !== this.currentQuery) {
            this.currentQuery = query;
            this.alreadyDownloadedIds = {};
            this._storeByIds(items);
            this.items = items;
            this.currentPage = page;

            this.hasMore = !!(items.length);

        } else if (this._noMoreImages(items)) {
            this.hasMore = false;
            this.currentPage = 0;

        } else {
            this._storeByIds(items);
            this.items = [...this.items, ...items];
            this.currentPage = page;
            this.hasMore = true;
        }
    }

    /**
     * Listens to: `ImagesActions.SET_SINGLE_ALBUM`
     * Sets single item to storage. Doesn't put it into `items` because that's the place for search results,
     * and this has been a single fetch.
     *
     * @param {object} item
     */
    handleSetSingleAlbum(item) {
        this.albumsById[item.id] = item;
    }

    /**
     * Listens to: `ImagesActions.SET_SINGLE_IMAGE`
     * Sets single item to storage. Doesn't put it into `items` because that's the place for search results,
     * and this has been a single fetch.
     *
     * @param {object} item
     */
    handleSetSingleImage(item) {
        this.imagesById[item.id] = item;
    }

    ///////////////public//////////////////////////////////////////////////////////////////

    /**
     *
     * @param {string|number} id - album id
     * @return {object}
     */
    getAlbumById = (id) => {
        return this.albumsById[id];
    };

    /**
     *
     * @param {string|number} id - image id
     * @return {object}
     */
    getImageById = (id) => {
        return this.imagesById[id];
    };

}

export default alt.createStore(ImagesStore, 'ImagesStore');
