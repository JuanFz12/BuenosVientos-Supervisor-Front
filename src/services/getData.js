import { TOKEN } from '../consts/api'

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${TOKEN}`
  }
}

export function getData({ url }) {
  return fetch(url, options).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return res.json().then(err => Promise.reject(err))
    }
  })
}
