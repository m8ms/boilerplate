import alt from '../alt';

import CommentsActions from '../actions/CommentsActions';

/**
 * Holds Comments.
 *
 * Comments are stored in a map per `parentId`, where parent is album or gallery.
 *
 */
export class CommentsStore {

    constructor() {
        this.comments = {};

        this.bindListeners({
            handleUpdateComments: CommentsActions.UPDATE_COMMENTS
        });

        this.exportPublicMethods({
            getCommentsFor: this.getCommentsById
        });
    }


    /**
     * Listens to: `CommentsActions.UPDATE_COMMENTS`
     * Stores comment in a map per `parentId`
     *
     * @param {object[]} comments
     * @param {string|number} parentId
     */
    handleUpdateComments({comments, parentId}) {
        if (parentId){
            this.comments[parentId] = comments;
        }
    }

    /**
     * Retrieved comments for particular `parentId`
     * @param {string|number} parentId
     * @return {object|undefined}
     */
    getCommentsById = (parentId) => {
        return this.comments[parentId];
    }
}

export default alt.createStore(CommentsStore, 'CommentsStore');
