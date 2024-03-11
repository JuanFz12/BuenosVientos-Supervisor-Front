import { TOKEN_NAME } from './consts'

export const HOST = 'http://sv-e2ukmdxmyh.cloud.elastika.pe:81'

export const api = `${HOST}/api`

export const TOKEN = localStorage.getItem(TOKEN_NAME)

export const apiRequest = {
  login: `${api}/auth/login-supervisor`,
  taxistas: `${api}/user-supervisor/drivers-associated`,
  crearTaxista: `${api}/driver/create`,
  vales: `${api}/user-supervisor/vales/aceppt`,
  valesSolicitudes: `${api}/user-supervisor/vales`,
  aceptarVale: `${api}/user-supervisor/vales/accept`
}
