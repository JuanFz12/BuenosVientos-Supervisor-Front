import { TOKEN } from '../consts/api'

export function upFormData ({ url, method = 'POST', body }) {
  const options = {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`
    },
    body
  }

  return fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        return res.json().then(err => Promise.reject(err))
      }
    })
}
