import React from 'react';
import Comment from '../../js/components/Comment';
import renderer from 'react-test-renderer';
import { comment, commentWithChildren } from '../__fixtures__/comments.fixtures';

it('renders correctly with no children', () => {

    const tree = renderer
        .create(<Comment comment={comment}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with children', () => {

    const tree = renderer
        .create(<Comment comment={commentWithChildren}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
