import React from 'react';
import AltContainer from 'alt-container';

import ImagesActions from '../actions/ImagesActions';
import ImagesStore from '../stores/ImagesStore';

import ImageSection from '../components/ImageSection';


function item(props) {
    return {
        store: ImagesStore,
        value: ImagesStore.getImageById(props.imageId)
    };
}

class ImagePage extends React.Component {

    constructor(props) {
        super(props);

        const imageId = this.props.match.params.id;

        if (!ImagesStore.getImageById(imageId)) {
            ImagesActions.fetchImage(imageId);
        }
    }

    render(){
        return (
            <div id="image-page">
                <AltContainer imageId={this.props.match.params.id} stores={{item}}>
                    <ImageSection modifier="single"/>
                </AltContainer>
            </div>
        )
    }
}

export default ImagePage;
