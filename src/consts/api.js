import { TOKEN_NAME } from './consts'

// export const HOST = 'https://node.bvientos.com.pe'
export const HOST = 'http://localhost:5000'

export const api = `${HOST}/api`

export const apiImages = `${api}/images`

export function getImage(url) {
  if (typeof url !== 'string') return null

  const haveInitialSlash = url[0] === '/'

  if (haveInitialSlash) {
    return `${apiImages}${url}`
  }

  return `${apiImages}/${url}`
}

export const TOKEN = localStorage.getItem(TOKEN_NAME)

export const apiRequestParams = {
  taxistas: {
    idTerminal: 'idTerminal'
  },
  vales: {
    idTerminal: 'idTerminal',
    idVale: 'idVale',
    idRequestVale: 'idRequestVale'
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
  actualizarVale: `${api}/user-supervisor/vales/edit/:${apiRequestParams.vales.idRequestVale}`,

  // Otros
  descargarReporteVales: `${api}/supervisor-excel`,

  // otrosTemporales
  corporativos: `${api}/supervisor-prueba`,
  buscarCorporativo: `${api}/supervisor-search/users`, // querys disponibles --> [query]

  pasajeros: `${api}/passenger`,
  crearPasajero: `${api}/passenger/register`,
  buscarPasajero: `${api}/supervisor-search/passengers`, // querys disponibles --> [query]

  vehiculos: `${api}/vehicle-type`,

  corporaciones: `${api}/corporation`,

  // Autenticacion
  renovarToken: `${api}/auth/renew-token-supervisor`,

  // Pagos
  pagos: `${api}/supervisor-payments`,
  descargarReportesPagos: `${api}/v2/systems/supervisor/driver-payments/excel`
}
