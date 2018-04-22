import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Thumbnail from  './Thumbnail';


class Gallery extends React.Component {

    getMore = () => {
        this.props.getMore(this.props.ImageStore.currentPage);
    };

    render() {
        const itemsFromStore = this.props.ImagesStore.items || [];
        const items = itemsFromStore.map(item => <Thumbnail key={item.id} item={item}/>);
        return (
            <InfiniteScroll pageStart={this.props.ImagesStore.currentPage - 1}
                            loadMore={this.props.getMore}
                            hasMore={this.props.ImagesStore.hasMore}
                            className="gallery"
                            loader={<div key={0} className="gallery__loader"><div className="loader"/></div>}>
                {items}
                {!this.props.ImagesStore.hasMore && <h3 className="gallery__end">- fin -</h3>}
            </InfiniteScroll>
        )
    }
}

export default Gallery;
