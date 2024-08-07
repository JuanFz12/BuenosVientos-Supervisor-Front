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
import { Pasajeros } from './pages/pasajeros/Pasajeros'
import { Cuotas } from './pages/cuotas/Cuotas'

const {
  logout,
  home,
  dashboard,
  taxistas,
  carreras,

  // vales
  vales,
  valesRoutes: { solicitudes: solicitudesVales },

  pasajeros,
  asistencias,
  exoneraciones,
  pagos,
  cuotas
} = routes

const router = createBrowserRouter([
  {
    path: home,
    element: (
      <RedirectIfLogged>
        <Home />
      </RedirectIfLogged>
    )
  },
  {
    path: logout,
    element: <Logout />
  },
  {
    path: '/',
    element: (
      <ProtectRoutes>
        <Layout />
      </ProtectRoutes>
    ),
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
        path: pasajeros,
        element: <Pasajeros />
      },
      {
        path: asistencias,
        element: <Asistencias />
      },
      {
        path: exoneraciones,
        element: <Exoneraciones />
      },
      {
        path: pagos,
        element: <Pagos />
      },
      {
        path: cuotas,
        element: <Cuotas />
      }
    ]
  },
  {
    path: '*',
    element: <Error404 />
  }
])

export function App() {
  return <RouterProvider router={router} />
}
