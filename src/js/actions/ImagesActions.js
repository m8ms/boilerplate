import alt from '../alt';
import ImgurService from '../services/ImgurService';
import ImagesStore from '../stores/ImagesStore';

class ImagesActions {


    updateImages(images, page) {
        return {images, page};
    }

    setCurrentImage(image) {
        return image
    }

    getCurrentImage(imgId) {
        const currentImageFromStore = ImagesStore.getState().images.find(img => img.id === imgId);

        if (currentImageFromStore) {
            return this.setCurrentImage(currentImageFromStore);
        }

        return ImgurService.fetchImage(imgId)
            .then(response => {
                this.setCurrentImage(response.data.data);
            })
            .catch(err => {
                console.error(err);
            })
    }

    fetchImages(page = 1) {
        return ImgurService.fetchPage(page)
            .then(response => {
                this.updateImages(response.data.data, page);
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export default alt.createActions(ImagesActions);
