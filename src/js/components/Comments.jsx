import React from 'react';

import Comment from './Comment';

class Comments extends React.Component {

    printComments() {
        const comments = this.props.comments;

        return comments.map(comment => <Comment key={comment.id} className="comments__item" comment={comment}/>);
    }

    render() {
        if( this.props.comments && this.props.comments.length ) {

            return (
                <div className="comments">
                    <h3 className="comments__header">Comments</h3>

                    <div className="comments__list">
                        {this.printComments()}
                    </div>
                </div>
            )
        }
        return null;
    }
}

export default Comments;
