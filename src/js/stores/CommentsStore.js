import alt from '../alt';

import CommentsActions from '../actions/CommentsActions';



class CommentsStore {
    constructor() {
        this.comments = {};

        this.bindListeners({
            handleGetComment: CommentsActions.GET_COMMENTS
        });

        this.exportPublicMethods({
            getCommentsFor: this.getCommentsFor
        });
    }

    handleGetComment(comment = {}) {
        if (comment.id){
            this.comments[id] = comment
        }
    }

    getCommentsFor = (imgId) => {
        return this.comments[imgId];
    }
}

export default alt.createStore(CommentsStore, 'CommentsStore');
