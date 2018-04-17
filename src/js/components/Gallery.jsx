import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Thumbnail from  './Thumbnail';


class Gallery extends React.Component {

    render() {
        const images = this.props.ImagesStore.images || [];
        const items = images.map(img => <Thumbnail key={img.id} image={img}/>);
        return (
            <InfiniteScroll pageStart={this.props.ImagesStore.currentPage - 1}
                            loadMore={this.props.getMore}
                            hasMore={this.props.ImagesStore.hasMore}
                            className="gallery"
                            loader={<div key={0} className="gallery__loader"><div className="loader"/></div>}>
                {items}
                {!this.props.ImagesStore.hasMore && <Thumbnail noMore/>}
            </InfiniteScroll>
        )
    }
}

export default Gallery;
