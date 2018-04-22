import React from 'react';
import Album from '../../js/components/Album';
import renderer from 'react-test-renderer';
import { commentWithChildren, comment } from '../__fixtures__/comments.fixtures';
import { album } from '../__fixtures__/album.fixtures';

window.matchMedia = window.matchMedia || function() {
        return {
            matches : false,
            addListener : function() {},
            removeListener: function() {}
        };
    };

it('renders correctly with no data', () => {
    const tree = renderer
        .create(<Album/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with album', () => {
    const tree = renderer
        .create(<Album album={album}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with album and comments', () => {
    const tree = renderer
        .create(<Album album={album} comments={[commentWithChildren, comment]}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
