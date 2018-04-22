import React from 'react';
import { Link } from 'react-router-dom';

class Gallery extends React.Component {

    static defaultProps = {
        item: {}
    }

    constructor(props) {
        super(props);
    }

    getThumbnailSrc() {
        const size = 'b';
        return 'https://i.imgur.com/' + (this.props.item.cover || this.props.item.id) + size + '.jpg'
    }

    getLink() {
        const linkBase = this.props.item.is_album ? '/album/' : '/image/';
        return linkBase + this.props.item.id;
    }

    getContent(){

        if (this.props.children){
            return this.props.children;
        }

        return (
            <Link to={this.getLink()}>
                <img className="thumbnail__image" src={this.getThumbnailSrc()} alt={this.props.item.id}/>
                <div className="thumbnail__info">{this.props.item.is_album ? 'alubm' : 'image'}</div>
            </Link>
        )

    }

    render() {



        return (
            <div className="thumbnail">
                <div className="thumbnail__content">
                    {this.getContent()}
                </div>
            </div>
        )
    }
}

export default Gallery;
