import axios from "axios";

export function userLogin({ username, password }: { username: string, password: string }) {
    if (username && password) {
        return axios.post('/oauth/login', { username, password })
    }
}

export function fetchMenu() {
    return axios.get('/oauth/menu')
}
