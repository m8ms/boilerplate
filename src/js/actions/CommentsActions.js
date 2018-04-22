import alt from '../alt';
import ImgurService from '../services/ImgurService';

/**
 * Fetches and updates comments.
 */
class CommentsActions {

    /**
     *
     * Updates Comments.
     * Dispatches UPDATE_COMMENTS.
     *
     * @param {array} comments - comments to dispatch
     * @param {number|string} parentId - id of entity that is commented, comments map key at store
     * @return {{comments: *, parentId: *}} - dispatched data
     */
    updateComments(comments, parentId) {
        return {comments, parentId};
    }

    /**
     * Asks service to fetch comments from remote places.
     *
     * @param {number|string} parentId - id of entity that the comments concern
     * @return {Promise} - service fetch result
     */
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
