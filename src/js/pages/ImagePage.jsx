import React from 'react';
import AltContainer from 'alt-container';

import CommentsActions from '../actions/CommentsActions';
import CommentsStore from '../stores/CommentsStore';

import ImagesActions from '../actions/ImagesActions';
import ImagesStore from '../stores/ImagesStore';

import ImageSection from '../components/ImageSection';

function commentsFetcher(props){
    return {
        store: CommentsStore,
        value: CommentsStore.getCommentsFor(props.imgId)
    };

}

class ImagePage extends React.Component {

    constructor(props) {
        super(props);

        ImagesActions.getCurrentImage(this.props.match.params.id);
        CommentsActions.getComments(this.props.match.params.id);
    }

    render() {
        return (
            <div id="image-page">
                <AltContainer imgId={this.props.match.params.id} stores={{
                      ImagesStore,
                      comments: commentsFetcher
                    }}>
                    <ImageSection/>
                </AltContainer>
            </div>
        )
    }
}

export default ImagePage;
