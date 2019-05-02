import APImanager from "./APImanager";

const remoteURL = "http://localhost:5002"

export default Object.create(APImanager, {
    resource: {
        value: "party"
    },
    all: {
        value: function () {
            return fetch(`${remoteURL}/${this.resource}?_expand=user`).then(e => e.json())
        }
    }
})