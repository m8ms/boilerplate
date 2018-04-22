import React from 'react';
import AltContainer from 'alt-container';

import ImagesStore from '../stores/ImagesStore';
import ImagesActions from '../actions/ImagesActions';

import Gallery from '../components/Gallery';

/**
 * Main Page.
 *
 * Includes search results, and empty search. Shows gallery. Uses `ImagesStore`.
 */
class MainPage extends React.Component {

    /**
     * Sets initial query to state.
     *
     * @param {object} props - the props
     */
    constructor(props) {
        super(props);

        this.state = {
            query: this.props.match.params.query || ''
        };
    }

    /**
     * Used by `InfiniteScroller` to fetch consecutive pages od search results.
     * @param {number} page - next page to fetch
     */
    getMoreItems = (page) => {
        ImagesActions.search(this.state.query, page);
    };

    /**
     * Compares next query with state, and if it changed, requests new search.
     *
     * @param {object} nextProps - contains next search query
     * @param {object} prevState - contains last search query
     * @return {object|null} - state with new search query
     */
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
