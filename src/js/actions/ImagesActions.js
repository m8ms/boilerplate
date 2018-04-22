import alt from '../alt';
import ImgurService from '../services/ImgurService';

class ImagesActions {

    updateItems(items, query, page) {
        return {items, page, query};
    }

    setSingleAlbum(item) {
        return item;
    }

    setSingleImage(item) {
        return item;
    }

    fetchAlbum(albumId) {
        return ImgurService.fetchAlbum(albumId)
            .then(response => {
                this.setSingleAlbum(response.data.data);
            })
            .catch(console.error)
    }

    fetchImage(imageId) {
        return ImgurService.fetchImage(imageId)
            .then(response => {
                this.setSingleImage(response.data.data);
            })
            .catch(console.error)
    }

    search(query, page) {
        return ImgurService.search(query, page)
            .then(response => {
                this.updateItems(response.data.data, query, page);
            })
            .catch(console.error)
    }
}

export default alt.createActions(ImagesActions);
