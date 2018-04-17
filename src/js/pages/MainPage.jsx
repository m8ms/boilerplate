import React from 'react';
import AltContainer from 'alt-container';

import ImagesStore from '../stores/ImagesStore';
import ImagesActions from '../actions/ImagesActions';

import Gallery from '../components/Gallery';

class MainPage extends React.Component {

    getMoreImages(page){
        ImagesActions.fetchImages(page);
    }

    render() {

        return (
            <div id="main-page">
                <AltContainer stores={{ImagesStore}}>
                    <Gallery getMore={this.getMoreImages}/>
                </AltContainer>
            </div>
        )
    }
}

export default MainPage;
