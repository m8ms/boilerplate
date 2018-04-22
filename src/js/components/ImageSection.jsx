import React from 'react';
import utils from '../helpers/utils';

class ImageSection extends React.Component {

    static defaultProps = {
        item: {}
    };

    printImgMeta() {
        const elements = [];
        if (this.props.item) {

            for (let property in this.props.item) {

                if (this.props.item.hasOwnProperty(property) && this.props.item[property]) {
                    const fieldClass = 'image-section__meta-field image-section__meta-field--' + property;

                    elements.push(
                        <div className={fieldClass}>
                            <label className="image-section__meta-label">{property}</label>
                            {this.props.item[property]}
                        </div>
                    )
                }
            }
        }
        return elements;
    }

    render() {

        return (
            <div className={utils.bemClasses('image-section', this.props.modifier)}>
                <div className="image-section__image-wrap">
                    <img className="image-section__image" src={this.props.item.link}/>
                </div>
                <div className="image-section__image-meta">
                    <div className="image-section__title">{this.props.item.title}</div>
                    <div className="image-section__description">{this.props.item.description}</div>
                    <div className="image-section__views-count">{this.props.item.views} views</div>
                    <div className="image-section__date">{utils.printDate(this.props.item.datetime)}</div>
                </div>
            </div>
        )
    }
}

export default ImageSection;
