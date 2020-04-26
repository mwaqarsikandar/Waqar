export const fakeAuth = {
    Authenticated: false,
    authenticate(cb) {
        this.Authenticated = true
        setTimeout(cb, 100)
    },
    signout(cb) {
        this.Authenticated = false
        setTimeout(cb, 100)
    }
}