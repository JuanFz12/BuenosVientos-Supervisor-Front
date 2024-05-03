import { TOKEN_NAME } from './consts'

export const HOST = 'http://sv-e2ukmdxmyh.cloud.elastika.pe:81'

export const api = `${HOST}/api`

export const apiImages = `${api}/images`

export function getImage (url) {
  if (typeof url !== 'string') return null
  return `${apiImages}${url}`
}

export const TOKEN = localStorage.getItem(TOKEN_NAME)

export const apiRequestParams = {
  taxistas: {
    idTerminal: 'idTerminal'
  },
  vales: {
    idTerminal: 'idTerminal',
    idVale: 'idVale'
  }
}

export const apiRequestSearchParams = {
  pasajeros: {
    buscar: 'query'
  },
  taxistas: {
    buscar: 'query'
  },
  corporativos: {
    buscar: 'query'
  }
}

export const apiRequest = {
  login: `${api}/auth/login-supervisor`,
  logout: `${api}/auth/logout`,

  taxistas: `${api}/user-supervisor/drivers-associated/:${apiRequestParams.taxistas.idTerminal}`,

  crearTaxista: `${api}/driver/create`,

  vales: `${api}/user-supervisor/vales/aceppt`,
  valesSolicitudes: `${api}/user-supervisor/vales`,
  aceptarVale: `${api}/user-supervisor/vales/accept/:${apiRequestParams.vales.idVale}`,
  crearVale: `${api}/user-supervisor/vales/register`,

  // otrosTemporales
  corporativos: `${api}/supervisor-prueba`,
  buscarCorporativo: `${api}/supervisor-search/users`,

  pasajeros: `${api}/supervisor-prueba/passenger`,
  buscarPasajero: `${api}/supervisor-search/passengers`, // querys disponibles --> [query]

  vehiculos: `${api}/vehicle-type`,

  // Autenticacion
  renovarToken: `${api}/auth/renew-token-supervisor`
}
