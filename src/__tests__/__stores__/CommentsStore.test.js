import alt from '../../js/alt';

import CommentsActions from '../../js/actions/CommentsActions';
import { CommentsStore as UnwrappedCommentsStore } from '../../js/stores/CommentsStore';

import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

let commentsStore = alt.stores.CommentsStore;

beforeEach(() => {
    //make sure we have a fresh instance of CommentsStore each test
    delete alt.stores.CommentsStore;
    commentsStore =  alt.createStore(UnwrappedCommentsStore, 'CommentsStore');
});

describe('CommentsStore', () => {

    let action = CommentsActions.UPDATE_COMMENTS;

    test('inits empty', () => {

        expect(commentsStore.getState().comments).toEqual({});
    });

    test('updates on UPDATE_COMMENTS', () => {

        const data = {
            comments: [{
                id: 1324378741,
                image_id: 'mBDfh',
                comment: 'Always upvote Poland ball',
                author: 'whalesurfertoo',
                children: [{
                    id: 1324379145,
                    image_id: 'mBDfh',
                    comment: 'Unless it has advanced tools. Then no. xd',
                    author: 'ThatOneGeographyNerd',
                    children: [{
                        id: 1324624585,
                        image_id: 'mBDfh',
                        comment: 'True',
                        author: 'whalesurfertoo',
                        children: []
                    }]
                }]
            }],
            parentId: 'mBDfh'
        };

        //add items to store when action dispatched
        alt.dispatcher.dispatch({action, data});

        const state = commentsStore.getState();

        expect(state.comments['mBDfh']).toEqual(data.comments);
    });

});
