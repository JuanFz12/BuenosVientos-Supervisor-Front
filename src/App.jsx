import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Pages
import { Home } from './pages/Home'
import { Error404 } from './pages/Error404'
import { routes } from './routes'
import { Dashboard } from './pages/dashboard/Dashboard'
import { Layout } from './Layout'
import { Taxistas } from './pages/taxistas/Taxistas'
import { Carreras } from './pages/carreras/Carreras'
import { Asistencias } from './pages/asistencias/Asistencias'
import { Vales } from './pages/vales/Vales'
import { SolicitudesVales } from './pages/vales/solicitudes/Solicitudes'
import { RenderVales } from './pages/vales/components/RenderVales'
import { Logout } from './pages/Logout'
import { Exoneraciones } from './pages/exoneraciones/Exoneraciones'
import { Pagos } from './pages/pagos/Pagos'
import { ProtectRoutes, RedirectIfLogged } from './ProtectRoutes'

const {
  logout,
  home,
  dashboard,
  taxistas,
  carreras,

  // vales
  vales,
  valesRoutes: {
    solicitudes: solicitudesVales
  },

  asistencias,
  exoneraciones,
  pagos
} = routes

const router = createBrowserRouter([
  {
    path: home,
    element: <RedirectIfLogged><Home /></RedirectIfLogged>
  },
  {
    path: logout,
    element: <Logout />
  },
  {
    // se separa porque necesita un titulo diferente, tambien se podria controlar con un estado, cambiar a eso si se necesita

    // UPDATE!! ----> ya no es necesario que este fuera del layout ya que ahora se puede cambiar las props del layout
    // usando useLayout()
    path: asistencias,
    element: <Layout title='Registro de Asistencias'><Asistencias /></Layout>
  },

  {
    path: '/',
    element: <ProtectRoutes><Layout /></ProtectRoutes>,
    children: [
      {
        path: dashboard,
        element: <Dashboard />
      },
      {
        path: taxistas,
        element: <Taxistas />
      },
      {
        path: carreras,
        element: <Carreras />
      },
      {
        path: vales,
        element: <Vales />,
        children: [
          {
            index: true,
            element: <RenderVales />
          },
          {
            path: solicitudesVales,
            element: <SolicitudesVales />
          }
        ]
      },
      {
        path: exoneraciones,
        element: <Exoneraciones />
      },
      {
        path: pagos,
        element: <Pagos />
      }
    ]
  },
  {
    path: '*',
    element: <Error404 />
  }
])

export function App () {
  return <RouterProvider router={router} />
}
