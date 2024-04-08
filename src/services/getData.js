import { TOKEN } from '../consts/api'

const options = {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
}

export function getData ({ url }) {
  return fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        // aqui solo estoy abarcando un solo caso de error
        if (res.status === 404) {
          return Promise.reject(res)
        } else if (res.status === 401) {
          // esto solo es temporal y deberia traer la ruta del logout desde la constante 'routes'

          // UPDATE!!! ----> es mejor que al hacer rechazar la promesa se maneje aqui y de acuerdo al status de la respuesta lanze una nueva
          // promesa para que se decida si se debe enviar en el catch la res cruda o enviar por parametros un json con el error
          window.location.assign('/logout')
        } else {
          res.json().then(err => Promise.reject(err))
        }
      }
    })
}
