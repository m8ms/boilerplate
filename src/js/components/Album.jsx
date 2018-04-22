import React from 'react';
import Slider from  'react-slick';

import ImageSection from  './ImageSection';
import Comments from  './Comments';

class Album extends React.Component {

    static defaultProps = {
        album: {}
    };


    printAlbumTitle(){

        if (this.props.album.title){
            return <h3 className="album__title">{this.props.album.title}</h3>;
        }
        return '';
    }

    printAlbumAuthor(){

        if (this.props.album.account_url){
            return <div className="album__author"> by {this.props.album.account_url}</div>;
        }
        return '';
    }

    printImages(){

        if (this.props.album.images){
            return this.props.album.images.map(img => <ImageSection key={img.id} item={img}/>);
        }
    }

    getImagesCount() {
        return this.props.album.images && this.props.album.images.length || ' ';
    }

    render() {

        const sliderSettings = {
            dots: true,
            speed: 500,
            adaptiveHeight: true,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <div className="album">
                <header className="album__header">
                    {this.printAlbumTitle()}
                    {this.printAlbumAuthor()}
                    <div className="album__image-count">Images in album: {this.getImagesCount()}</div>
                </header>
                <Slider {...sliderSettings}>
                    {this.printImages()}
                </Slider>
                <Comments comments={this.props.comments}/>
            </div>

        )
    }
}

export default Album;
