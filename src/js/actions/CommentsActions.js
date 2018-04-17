import alt from '../alt';
import ImgurService from '../services/ImgurService';

class CommentsActions {

    getComments(imgId) {


        return ImgurService.fetchComments(imgId)
            .then(response => response.data.data)
            .catch(err => {
                console.error(err);
                return [];
            })
    }

}

export default alt.createActions(CommentsActions);
