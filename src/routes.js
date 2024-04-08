export const routes = {
  home: '/',
  login: '/',
  logout: '/logout',
  dashboard: '/dashboard',
  taxistas: '/taxistas',
  carreras: '/carreras',
  vales: '/vales',
  valesRoutes: {
    solicitudes: 'solicitudes-de-vale'
  },
  asistencias: '/asistencias',
  exoneraciones: '/exoneraciones',
  pagos: '/pagos',
  pagosRoutes: {
    index: 'pagos',
    detallesPago: ':idPago',
    pagosDenominacion: ':idPago/:idDenominacion'
  }
}
