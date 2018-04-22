import React from 'react';
import ImageSection from '../../js/components/ImageSection';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

const item = {
    id: 'GRDXXdF',
    title: null,
    description: 'Sorry I haven\'t been uploading stuff like this lately. Hopefully this\'ll make up for it.',
    datetime: 1523224179,
    type: 'image/png',
    animated: false,
    width: 6000,
    height: 7000,
    size: 263782,
    views: 3965,
    tags: [],
    link: 'https://i.imgur.com/GRDXXdF.png',
    ups: 34,
    downs: 2,
    points: 32,
    score: 2
};

it('renders correctly with no item', () => {
    const tree = renderer
        .create(<ImageSection/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with item', () => {

    const tree = renderer
        .create(<ImageSection item={item}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with modifiers', () => {

    const tree = renderer
        .create(<ImageSection item={item} modifiers="large single"/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
