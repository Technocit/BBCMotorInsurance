import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

import config from 'config';
import { handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ username, password })
    };
    // var link = 'http://gulfoasisuat.uaenorth.cloudapp.azure.com:91/api/Login/GenerateToken';
    // axios.post(link, requestOptions).then(res => {
    //    console.log(res)
    // })
    
    return fetch(`http://gulfoasisuat.uaenorth.cloudapp.azure.com:91/api/Login/GenerateToken`, requestOptions)
        .then(handleResponse)
        .then(user => {
            console.log('api',user);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
