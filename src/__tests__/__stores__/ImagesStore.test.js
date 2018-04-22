import alt from '../../js/alt';

import ImagesActions from '../../js/actions/ImagesActions';
import { ImagesStore as UnwrappedImagesStore } from '../../js/stores/ImagesStore';

import AltTestingUtils from 'alt-utils/lib/AltTestingUtils';

let imagesStore = alt.stores.ImagesStore;

beforeEach(() => {
    //make sure we have a fresh instance of ImagesStore each test
    delete alt.stores.ImagesStore;
    imagesStore =  alt.createStore(UnwrappedImagesStore, 'ImagesStore');
});

describe('ImagesStore', () => {

    let action = ImagesActions.UPDATE_ITEMS;

    test('inits empty', () => {

        const state = imagesStore.getState();

        expect(state.items.length).toBe(0);
        expect(state.currentPage).toBe(0);
        expect(state.currentQuery).toBe('');
        expect(state.imagesById).toEqual({});
        expect(state.albumsById).toEqual({});
        expect(state.hasMore).toBe(true);
    });

    test('updates on UPDATE_ITEMS', () => {

        const data = {
            page: 1,
            query: '',
            items: [
                {id: 'asdfe', is_album: true},
                {id: '10345', is_album: true}
            ]
        };

        //add items to store when action dispatched
        alt.dispatcher.dispatch({action, data});

        const state = imagesStore.getState();

        expect(state.items.length).toBe(2);
        expect(state.albumsById['asdfe']).toEqual(data.items[0]);
        expect(state.currentPage).toBe(1);
        expect(state.currentQuery).toBe('');
    });

    test('can retrieve each item by id', () => {

        const data = {
            page: 1,
            query: '',
            items: [
                {id: 'image_1', is_album: false},
                {id: 'album_1', is_album: true}
            ]
        };

        //add one image and one album to store
        alt.dispatcher.dispatch({action, data});

        //image and album can be retrieved by is
        expect(imagesStore.getImageById('image_1')).toEqual(data.items[0]);
        expect(imagesStore.getAlbumById('album_1')).toEqual(data.items[1]);
    });


    test('clears on new query', () => {

        const data = {
            page: 2,
            query: 'qqqq',
            items: [
                {id: 'asdfe', is_album: false},
                {id: '12345', is_album: true}
            ]
        };

        //add results of one query to store
        alt.dispatcher.dispatch({action, data});

        data.page = 1;
        data.query = 'other query';
        data.items =  [
            {id: 'assdfdfe', is_album: false},
            {id: '1234345', is_album: true},
            {id: 'ass4rdfe', is_album: false},
            {id: '12sdf345', is_album: true}
        ];

        //add results of another query
        alt.dispatcher.dispatch({action, data});

        const state = imagesStore.getState();

        //only new query results reside in store
        expect(state.items.length).toBe(4);
        //query updated
        expect(state.currentQuery).toBe('other query');
        //currentPage reset
        expect(state.currentPage).toBe(1);
        //clears maps as well
        expect(imagesStore.getImageById('12345')).toBeUndefined();
    });

    test('appends next page', () => {

        const data = {
            page: 1,
            query: '',
            items: [
                {id: 'asdfe', is_album: false},
                {id: '12345', is_album: true}
            ]
        };

        //add results to store
        alt.dispatcher.dispatch({action, data});

        data.page++;
        data.items = [
            {id: 'assdfdfe', is_album: false},
            {id: '1234345', is_album: true},
            {id: 'ass4rdfe', is_album: false},
            {id: '12sdf345', is_album: true}
        ];


        //add next page of results to store
        alt.dispatcher.dispatch({action, data});

        const state = imagesStore.getState();

        expect(state.items.length).toBe(6);
        expect(state.currentPage).toBe(2);
    });


    test('ends when pages start to loop', () => {
        const data = {
            page: 1,
            query: 'new query',
            items: [
                {id: 'asdfe', is_album: false},
                {id: '12345', is_album: true}
            ]
        };

        //add results to store
        alt.dispatcher.dispatch({action, data});

        data.page++;
        data.items = [
            {id: 'assdfdfe', is_album: false},
            {id: '1234345', is_album: true},
            {id: 'ass4rdfe', is_album: false},
            {id: '12sdf345', is_album: true}
        ];

        //add next page of results to store
        alt.dispatcher.dispatch({action, data});


        data.page++;
        data.items = [
            {id: 'asdfe', is_album: false},
            {id: '12345', is_album: true}
        ];


        //add next page of results that are the same as on some previous page
        alt.dispatcher.dispatch({action, data});

        const state = imagesStore.getState();

        expect(state.items.length).toBe(6);
        expect(state.currentPage).toBe(0);
        expect(state.hasMore).toBe(false);
    });

    test('ends when page comes empty', () => {

        const data = {
            page: 1,
            query: '',
            items: [
                {id: 'asdfe', is_album: false},
                {id: '12345', is_album: true}
            ]
        };

        //add results to store
        alt.dispatcher.dispatch({action, data});

        data.page++;
        data.items = [
            {id: 'assdfdfe', is_album: false},
            {id: '1234345', is_album: true},
            {id: 'ass4rdfe', is_album: false},
            {id: '12sdf345', is_album: true}
        ];

        //add next page of results to store
        alt.dispatcher.dispatch({action, data});


        data.page++;
        data.items = [
            {id: 'asdfe', is_album: false},
            {id: '12345', is_album: true}
        ];


        //add next page of results that are the same as on some previous page
        alt.dispatcher.dispatch({action, data});

        const state = imagesStore.getState();

        expect(state.items.length).toBe(6);
        expect(state.currentPage).toBe(0);
        expect(state.hasMore).toBe(false);
    });

    test('ends when page comes empty', () => {

        const data = {
            page: 1,
            query: '',
            items: [
                {id: 'asdfe', is_album: false},
                {id: '12345', is_album: true}
            ]
        };

        //add results to store
        alt.dispatcher.dispatch({action, data});

        data.page++;
        data.items = [
            {id: 'assdfdfe', is_album: false},
            {id: '1234345', is_album: true},
            {id: 'ass4rdfe', is_album: false},
            {id: '12sdf345', is_album: true}
        ];

        //add next page of results to store
        alt.dispatcher.dispatch({action, data});


        data.page++;
        data.items = [
            {id: 'asdfe', is_album: false},
            {id: '12345', is_album: true}
        ];


        //add next page of results that are the same as on some previous page
        alt.dispatcher.dispatch({action, data});

        const state = imagesStore.getState();

        expect(state.items.length).toBe(6);
        expect(state.currentPage).toBe(0);
        expect(state.hasMore).toBe(false);
    });


    test('ends when page comes empty', () => {

        const data = {
            page: 1,
            query: '',
            items: [
                {id: 'asdfe', is_album: false},
                {id: '12345', is_album: true}
            ]
        };

        //add results to store
        alt.dispatcher.dispatch({action, data});


        expect(imagesStore.getState().hasMore).toBe(true);

        data.page++;
        data.items = [];

        //add [] to store as next page
        alt.dispatcher.dispatch({action, data});

        expect(imagesStore.getState().hasMore).toBe(false);

    });

    test('updates on SET_SINGLE_ALBUM', () => {

        const action = ImagesActions.SET_SINGLE_ALBUM;

        const data = {
            id: 'kRpEc',
            title: 'Civ V Polandball-esq OC',
            datetime: 1449884229,
            cover: 'Z5bVH8y',
            tags: [],
            in_most_viral: false,
            images: [{
                id: 'Z5bVH8y',
                datetime: 1449883805,
                type: 'image/png'
            }, {
                id: '3Z40Oo4',
                datetime: 1449883808,
                type: 'image/png'
            }]
        };

        //dispatch single album update
        alt.dispatcher.dispatch({action, data});

        const state = imagesStore.getState();

        expect(state.albumsById['kRpEc']).toEqual(data);
    });

    test('updates on SET_SINGLE_IMAGE', () => {

        const action = ImagesActions.SET_SINGLE_IMAGE;

        const data = {
            id: 'Z5bVH8y',
            datetime: 1449883805,
            type: 'image/png'
        };

        //dispatch single image update
        alt.dispatcher.dispatch({action, data});

        const state = imagesStore.getState();

        expect(state.imagesById['Z5bVH8y']).toEqual(data);
    });

});
