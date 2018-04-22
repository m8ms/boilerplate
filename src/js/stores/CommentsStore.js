import alt from '../alt';

import CommentsActions from '../actions/CommentsActions';



class CommentsStore {
    constructor() {
        this.comments = {};

        this.bindListeners({
            handleUpdateComments: CommentsActions.updateComments
        });

        this.exportPublicMethods({
            getCommentsFor: this.getCommentsFor
        });
    }

    handleUpdateComments({comments, parentId}) {
        if (parentId){
            this.comments[parentId] = comments;
        }
    }

    getCommentsFor = (parentId) => {
        return this.comments[parentId];
    }
}

export default alt.createStore(CommentsStore, 'CommentsStore');
