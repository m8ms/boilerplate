import React from 'react';
import AltContainer from 'alt-container';

import ImagesStore from '../stores/ImagesStore';
import ImagesActions from '../actions/ImagesActions';

import Gallery from '../components/Gallery';

class MainPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            query: this.props.match.params.query || ''
        };
    }

    getMoreItems = (page) => {
        ImagesActions.search(this.state.query, page);
    };

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.match.params.query !== prevState.query) {
            ImagesActions.search(nextProps.match.params.query || '');

            return {
                query: nextProps.match.params.query
            }
        }
        return null;
    }

    render() {
        return (
            <div id="main-page">
                <AltContainer stores={{ImagesStore}}>
                    <Gallery getMore={this.getMoreItems}/>
                </AltContainer>
            </div>
        )
    }
}

export default MainPage;
