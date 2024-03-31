import axios from "axios";

export function updateObj(permission: any) {
    return axios.post('/users/permissions')
}