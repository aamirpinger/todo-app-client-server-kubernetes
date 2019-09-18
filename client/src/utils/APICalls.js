import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_baseAPIURL
});

axiosInstance.interceptors.response.use(
    res => {

        return res;
    },
    error => {
        return Promise.reject(error.response)
    }
);

export const logout = () => {
    return axiosInstance.post(process.env.REACT_APP_baseAPIURL + '/logout').then(user => {
        delete axiosInstance.defaults.headers.common["Authorization"];
        return user.data
    })
}


export const login = (email, password) => {
    return axiosInstance.post('/login', {
        email,
        password
    }).then(user => {
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
        return user.data
    })
}

export const signup = (name, email, password) => {
    return axiosInstance.post('/signup', {
        name,
        email,
        password
    }).then(user => {
        return user.data
    })
}
