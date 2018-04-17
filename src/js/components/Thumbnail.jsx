import React from 'react';
import { Link } from 'react-router-dom';

class Gallery extends React.Component {

    constructor(props) {
        super(props);
    }

    getThumbnailSrc() {
        const size = 'b';
        return 'https://i.imgur.com/' + (this.props.image.cover || this.props.image.id) + size + '.jpg'
    }

    render() {
        let content;

        if (this.props.noMore) {
            content = <span className="thumbnail__no-more">- Fin -</span>

        }else if (this.props.children){
            content = this.props.children;
        } else {
            content = (
                <Link to={`/image/${this.props.image.id}`}>
                    <img className="thumbnail__image" src={this.getThumbnailSrc()} alt={this.props.image.id}/>
                </Link>
            )
        }


        return (
            <div className="thumbnail">
                <div className="thumbnail__content">
                    {content}
                </div>
            </div>
        )
    }
}

export default Gallery;
