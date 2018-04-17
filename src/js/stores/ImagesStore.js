import ImagesActions from '../actions/ImagesActions';
import alt from '../alt';


const _imageIds = {};

function _isImageAlreadyDownloaded(imageId) {
    return !!_imageIds[imageId];
}

function _noMoreImages(images = []) {
    if (images[0] && images[0].id) {
        return _isImageAlreadyDownloaded(images[0].id);
    }
    return true;
}

function _storeImageIds(images = []) {
    for (const image of images) {
        _imageIds[image.id] = true;
    }
    return _imageIds;
}

class ImagesStore {
    constructor() {
        this.images = [];
        this.hasMore = true;
        this.currentImage = null;
        this.currentPage = 0;

        this.bindListeners({
            handleUpdateImages: ImagesActions.updateImages,
            handleSetCurrentImage: ImagesActions.setCurrentImage
        })


    }

    handleUpdateImages({images, page}) {
        if (_noMoreImages(images)) {
            this.hasMore = false;
        } else {
            _storeImageIds(images);
            this.images = [...this.images, ...images];
            this.currentPage = page + 1;
        }
    }

    handleSetCurrentImage(image) {
        this.currentImage = image;

    }

}

export default alt.createStore(ImagesStore, 'ImagesStore');
