import ImagesActions from '../actions/ImagesActions';
import alt from '../alt';

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

    _isItemAlreadyDownloaded(id) {
        return !!(this.alreadyDownloadedIds[id]);
    }

    _noMoreImages(items = []) {
        if (items[0] && items[0].id) {
            return this._isItemAlreadyDownloaded(items[0].id);
        }
        return true;
    }

    _storeByIds(items = []) {

        for (const item of items) {

            const storeMap = item.is_album ? this.albumsById : this.imagesById;

            storeMap[item.id] = storeMap[item.id] || item;

            this.alreadyDownloadedIds[item.id] = 1;
        }
    }

    ///////////////actions listeners///////////////////////////////////////////////////////

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

    handleSetSingleAlbum(item) {
        this.albumsById[item.id] = item;
    }

    handleSetSingleImage(item) {
        this.imagesById[item.id] = item;
    }

    ///////////////public//////////////////////////////////////////////////////////////////

    getAlbumById = (id) => {
        return this.albumsById[id];
    };

    getImageById = (id) => {
        return this.imagesById[id];
    };

}

export default alt.createStore(ImagesStore, 'ImagesStore');
