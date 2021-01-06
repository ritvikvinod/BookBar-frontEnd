import {BACKEND_API, SESSION} from "../common/constants";

export const logout = () =>
    fetch(`${BACKEND_API}/api/session`,
          {
              method: 'DELETE',
              credentials: 'include'
          })

export const updateProfile = (user,userId) => {
    return fetch(`${BACKEND_API}/api/users/updateProfile/${userId}`,
                 {
                     method: 'POST',
                     body: JSON.stringify(user),
                     headers: {
                         'content-type': 'application/json'
                     },
                     credentials: 'include'
                 })
}

export const login = (user) => {
    return fetch(`${BACKEND_API}/api/session`,
                 {
                     method: 'POST',
                     body: JSON.stringify(user),
                     headers: {
                         'content-type': 'application/json'
                     },
                     credentials: 'include'
                 })
}

export const register = (user) =>
    fetch(`${BACKEND_API}/api/users`,
          {
              method: 'POST',
              body: JSON.stringify(user),
              headers: {
                  'content-type': 'application/json'
              },
              credentials: 'include'
          })

export const checkLoggedIn = async preloadedStateFn => {
    const localSession = JSON.parse(localStorage.getItem(SESSION))
    let preloadedState = {};
    if(localSession){
        preloadedState = {
            session: localSession
        }
    }
    else {
        const response = await fetch(`${BACKEND_API}/api/session`,
                                     {credentials: 'include'}
        );
        const {user} = await response.json();
        if (user) {
            localStorage.setItem(SESSION, JSON.stringify(user))
            preloadedState = {
                session: user
            };
        }
    }
    return preloadedState;
};

export const getUserDetails = (userId) => fetch(`${BACKEND_API}/api/users/${userId}`,
                                          {credentials: 'include'}).then(res => res.json())

