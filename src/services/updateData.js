import { TOKEN } from '../consts/api'

/**
 *
 * @param {object} params - Parametros de la peticion
 * @param {string} params.url - Url de la peticion
 * @param {object} params.body - Cuerpo de la peticion
 * @param {'PUT' | 'PATCH'} params.method - Metodo de la peticion
 * @returns
 */
export function updateData ({ url, body, method = 'PUT' }) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`
    },
    body: JSON.stringify(body)
  }

  return fetch(url, options)
    .then(res => res.ok ? res.json() : res.json().then(err => Promise.reject(err)))
}
