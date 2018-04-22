import React from 'react';
import AltContainer from 'alt-container';

import CommentsActions from '../actions/CommentsActions';
import CommentsStore from '../stores/CommentsStore';

import ImagesActions from '../actions/ImagesActions';
import ImagesStore from '../stores/ImagesStore';

import Album from '../components/Album';

/**
 * `CommentsStore -> comments` fetcher.
 *
 * @param {object} props - AltContainer props
 * @param {object} props.albumId - id of album to get comments
 */
function comments(props) {
    return {
        store: CommentsStore,
        value: CommentsStore.getCommentsFor(props.albumId)
    };
}

/**
 * `ImagesStore -> singleAlbum` fetcher.
 *
 * @param {object} props - AltContainer props
 * @param {object} props.albumId - id of album for `Album` component to display
 */
function album(props) {
    return {
        store: ImagesStore,
        value: ImagesStore.getAlbumById(props.albumId)
    };
}

/**
 * Displays album with comments.
 * Listens to `ImagesStore`, `CommentsStore`.
 *
 * Calls for single album and comments fetch at mount.
 */
class AlbumPage extends React.Component {

    constructor(props) {
        super(props);

        const albumId = this.props.match.params.id;

        ImagesActions.fetchAlbum(albumId);
        CommentsActions.fetchComments(albumId);
    }

    render(){
        return (
            <div id="album-page">
                <AltContainer albumId={this.props.match.params.id} stores={{
                      album,
                      comments
                    }}>
                    <Album/>
                </AltContainer>
            </div>
        )
    }
}

export default AlbumPage;
