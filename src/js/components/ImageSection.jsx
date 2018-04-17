import React from 'react';

class ImageSection extends React.Component {


    constructor(props) {
        super(props);
    }

    getCurrentImageLink(){
        return this.props.ImagesStore.currentImage && this.props.ImagesStore.currentImage.link;
    }

    getCurrentImageTitle(){
        return this.props.ImagesStore.currentImage && this.props.ImagesStore.currentImage.title;
    }

    render() {
        console.log(this.props);
        return (
            <div className="image-section">
                <h4>{this.getCurrentImageTitle()}</h4>
                <img className="image-section__image" src={this.getCurrentImageLink()}/>
            </div>

        )
    }
}

export default ImageSection;
