import React from 'react';
import SearchBox from '../../js/components/SearchBox';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

it('renders correctly with no query', () => {
    const tree = renderer
        .create(<Router><SearchBox/></Router>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
