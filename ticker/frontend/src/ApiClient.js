import UserStore from './stores/UserStore';

const API_ROOT = 'http://localhost:8000/ticker';

const handleErrors = err => {
    if(err.status === 401) {
        UserStore.logout();
    }
}

const responseBody = resp => {
    if(resp.ok) {
        return resp.json();
    }
    else {
        return Promise.reject({ status: resp.status, statusText: resp.statusText });
    }
};

function getHeader() {
    if(UserStore.token) {
        return {
                "Content-Type": "application/json",
                "Authorization": `Token ${UserStore.token}`,
            }
    }
    return {
        "Content-Type": "application/json",
    }
}

const requests = {
    get: url => fetch(`${API_ROOT}${url}`, {
                method: "GET",
                headers: getHeader()
            })
            .then(responseBody)
            .catch(handleErrors),
    post: (url, data) => fetch(`${API_ROOT}${url}`, {
                method: "POST",
                headers: getHeader(),
                body: JSON.stringify(data)
            })
            .then(responseBody)
            .catch(handleErrors),
    patch: (url, data) => fetch(`${API_ROOT}${url}`, {
                method: "PATCH",
                headers: getHeader(),
                body: JSON.stringify(data)    
            })
            .then(responseBody)
            .catch(handleErrors),
}

const User = {
    get: () => 
        requests.get(`/me/`),
}

const Stocks = {
    search: (ticker) =>
        requests.get(`/stocks/search/?ticker=${ticker}`),
    get: (data) =>
        requests.post(`/stocks/get_ticker/`, data),
}

export default {
    requests,
    User,
    Stocks,
};