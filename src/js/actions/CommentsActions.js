import alt from '../alt';
import ImgurService from '../services/ImgurService';

class CommentsActions {

    updateComments(comments, parentId) {
        return {comments, parentId};
    }

    fetchComments(parentId) {
        return ImgurService.fetchComments(parentId)
            .then(response => {
                this.updateComments(response.data.data, parentId)
            })
            .catch(err => {
                console.error(err);
                return [];
            })
    }

}

export default alt.createActions(CommentsActions);
