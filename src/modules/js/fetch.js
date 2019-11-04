import axios from 'axios'
import url from 'js/api.js'

function fetch(url, data) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res => {
            let status = res.data.status
            if (status === 200) {
                reject(res)
            }
            if (status === 300) {
                location.href = 'login.html'
                reject(res)
            }
            reject(res)
        }).catch(error => {
            reject(res)
        })
    })
}

export default fetch
