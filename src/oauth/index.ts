export function loginStatus(): boolean {
    const status = !!localStorage.getItem('token')
    return status
}