import React from 'react';
import moment from 'moment';


class Comment extends React.Component {

    getBemClasses() {
        let classes = 'comment';

        if (this.props.modifiers) {
            for (let modifier of this.props.modifiers) {
                classes += ` ${classes}--${modifier}`;
            }
        }

        return classes;
    }

    printPoints() {
        const points = this.props.comment.points;

        if (points) {
            return <div className="comment__points">{points + 'pt' + (points > 1 ? 's' : '')}</div>;
        }
    }

    printDate() {

        if (this.props.comment.datetime) {

            const date = moment(this.props.comment.datetime * 1000);

            if (date.isValid()) {
                return <div className="comment__date">{date.fromNow()}</div>;
            }
        }
    }

    printSubcomments() {
        const subcomments = this.props.comment.children || [];

        return subcomments.map(comment => <Comment modifiers={['sub-comment']} key={comment.id} comment={comment}/>);
    }

    getSubCommentsSectionClasses(){
        let classes = 'comment__sub-comments';

        if (!this.props.comment.children || !this.props.comment.children.length) {
            classes += ' comment__sub-comments--empty';
        }
        return classes;
    }

    render() {
        const comment = this.props.comment;
        return (
            <div className={this.getBemClasses()}>
                <div className="comment__author">
                    <div className="comment__username">{comment.author}</div>
                    {this.printPoints()}
                    {this.printDate()}
                </div>
                <div className="comment__content">{comment.comment}</div>
                <div className={this.getSubCommentsSectionClasses()}>
                    {this.printSubcomments()}
                </div>
            </div>
        )
    }
}

export default Comment;
