import axios from "axios";

export function fetch() {
    return axios.get('/testdemo/fetchList')
}

export function editObj(obj) {
    return axios.put('/testdemo', obj)
}

export function addObj(obj) {
    return axios.post('/testdemo', obj)
}
