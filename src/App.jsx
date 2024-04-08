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
    path: logout,
    element: <Logout />
  },
  {
    path: home,
    element: <Home />
  },
  {
    // se separa porque necesita un titulo diferente, tambien se podria controlar con un estado, cambiar a eso si se necesita
    path: asistencias,
    element: <Layout title='Registro de Asistencias'><Asistencias /></Layout>
  },

  {
    path: '/',
    element: <Layout />,
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
