function ui(state = [], action) {
    var newState = Object.assign({}, state);

    switch (action.type) {
        case 'SET_LOADING_STATUS':
            newState.loading = action.value;
            return newState;
        case 'SET_MAP_VIEW':
            newState.mapView = action.value;
            return newState;
        case 'SET_RETURN_TO_MAPVIEW':
            newState.returnToMapView = action.value;
            return newState;
        case 'SET_UPLOADING_NEW_IMAGE':
            newState.uploadingNewImage = action.value;
            return newState;
        case 'SET_FETCHING_NEW_LISTING':
            newState.fetchingNewListing = action.value;
            return newState;
    }
    return state;
}

export default ui;
