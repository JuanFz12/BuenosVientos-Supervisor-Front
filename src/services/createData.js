import { TOKEN } from '../consts/api'

export function createData ({ url, body }) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`
    },
    body: JSON.stringify(body)
  }

  return fetch(url, options)
    .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
}
