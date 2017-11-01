import Axios from 'axios';
import { loadLocalStorage } from '../functions';

// set some default stuff

function getApiUrl() {
    const apiUrl = localStorage.getItem('test.apiUrl');

    if (apiUrl) { return apiUrl; }

    return "https://api.homadic.co/";
}

function getAuthHeader() {
    var auth = loadLocalStorage("auth");

    if (auth == null || auth.access_Token == null) {
        return null;
    }

    return {
        headers: {
            Authorization: auth.access_Token
        }
    }
}

Axios.defaults.baseURL = getApiUrl();

// login

export function apiPerformLogin(code) {
    return Axios.post("token", { code });
}

export function apiValidateToken() {
    return Axios.get("token/validate", getAuthHeader())
}

// profile

export function apiGetProfile() {
    return Axios.get("profile", getAuthHeader());
}

// google maps

export function apiSearchAutocomplete(query) {
    return Axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + query + "&types=(cities)&key=AIzaSyCH7lJaKLHKo-uchWFd0WRMlLPx9Yuab18");
}

export function apiNearbyResults(coordinates) {
    return Axios.get("nearby?lat=" + coordinates.lat + "&lng=" + coordinates.lng);
}

export function apiGetGooglePlace(googlePlaceId) {
    return Axios.get("nearby/" + googlePlaceId);
}

// homees

export function apiGetHomes(query) {
    return Axios.get("homes");
}

export function apiGetHome(homeSlug) {
    return Axios.get("homes/" + homeSlug);
}