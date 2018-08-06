/* global Promise */
import { apiNearbyResults } from '../../api';
import { emptyListing } from '../../data';
import { guid } from '../../functions';

// set values from google maps listing
export function clearNewListing() {
    return {
        type: 'CLEAR_NEW_LISTING',
        emptyListing
    }
}

export function setNewListing(listing) {
    return {
        type: 'SET_NEW_LISTING',
        listing
    }
}

// change status
export function setFetchingNearbyResultsStatus(value) {
    return {
        type: 'SET_FETCHING_NEARBY_RESULTS_STATUS',
        value
    }
}

// set validation value
export function setValidationValue(key, value) {
    return {
        type: 'SET_VALIDATION_VALUE',
        key,
        value
    }
}

// set values from google maps listing
export function setListingFromGoogleMaps(googleMapsPlace) {
    return {
        type: 'SET_LISTING_FROM_GOOGLE_MAPS',
        googleMapsPlace
    }
}

// update nearby results
export function setNearbyResults(data) {
    return {
        type: 'SET_NEARBY_RESULTS',
        data
    }
}

export function clearNearbyResults() {
    return {
        type: 'CLEAR_NEARBY_RESULTS'
    }
}

export function updateInputProp(key, value) {
    return {
        type: 'UPDATE_INPUT_PROP',
        key,
        value
    }
}

export function setExpandedRoom(roomId) {
    return {
        type: 'SET_EXPANDED_ROOM',
        roomId
    }
}

export function removeRoom(roomId) {
    return {
        type: 'REMOVE_ROOM',
        roomId
    }
}

export function addRoomToListing(room) {
    return {
        type: 'ADD_ROOM_TO_LISTING',
        id: guid(),
        room
    }
}

export function setGmid(gmid) {
    return {
        type: 'SET_GMID',
        gmid
    }
}

// handle getting nearby results from google through our Api
export function handleGetNearbyResults(coordinates) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            const request = apiNearbyResults(coordinates);
            dispatch(setFetchingNearbyResultsStatus(true));

            request.then(response => {
                dispatch(setFetchingNearbyResultsStatus(false));
                dispatch(setNearbyResults(response.data.results));
                resolve();
            }).catch(error => {
                dispatch(setFetchingNearbyResultsStatus(false));
                reject(error);
            });
        });
    };
}