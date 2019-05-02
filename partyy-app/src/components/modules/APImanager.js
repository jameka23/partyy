// this is the parent api manager
const remoteURL = "http://localhost:5002"

export default Object.create(null,{
    resource: {
        value: ""
    },
    get: {
        value: function (id) {
            return fetch(`${remoteURL}/${this.resource}/${id}`).then(e => e.json())
        }
    },
    all: {
        value: function () {
            return fetch(`${remoteURL}/${this.resource}`).then(e => e.json())
        }
    },
    delete: {
      value: function(id) {
        return fetch(`${remoteURL}/${this.resource}/${id}`, {
          method: "DELETE"
        })
        .then(e => e.json())        
      }
    },
    post: {
        value: function (newObj) {
          return fetch(`${remoteURL}/${this.resource}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newObj)
          }).then(r => r.json())
        }
      },
      put: {
        value: function (updatedObj, id) {
          return fetch(`${remoteURL}/${this.resource}/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedObj)
          }).then(r => r.json())
        }
      }
})