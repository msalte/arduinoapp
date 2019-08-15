import isomorphicFetch from "isomorphic-fetch";

export const fetch = (url, addOptions = {}) => {
    let options = Object.assign({}, addOptions);

    return isomorphicFetch(url, options).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    });
};

const method = m => (url, data, auth = false) => {
    const options = { method: m, body: JSON.stringify(data) };

    return fetch(url, auth, options);
};

export const post = method("POST");
