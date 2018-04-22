import React from 'react';
import AltContainer from 'alt-container';

import CommentsActions from '../actions/CommentsActions';
import CommentsStore from '../stores/CommentsStore';

import ImagesActions from '../actions/ImagesActions';
import ImagesStore from '../stores/ImagesStore';

import Album from '../components/Album';

function comments(props) {
    return {
        store: CommentsStore,
        value: CommentsStore.getCommentsFor(props.albumId)
    };
}

function album(props) {
    return {
        store: ImagesStore,
        value: ImagesStore.getAlbumById(props.albumId)
    };
}

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
