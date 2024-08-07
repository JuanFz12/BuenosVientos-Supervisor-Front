import { FooterPaginacion } from '../paginacion/FooterPaginacion'
import { TablaBase } from './TablaBase'

export function TablaTriple({
  headers1,
  render1,
  className1 = '',
  // la tabla principal aqui
  headers2,
  render2,
  // si el children esta definido se usara ese por defecto para la segunda tabla
  children,
  className2 = '',
  // la tercera tabla aqui
  headers3,
  render3,
  className3 = ''
}) {
  return (
    <section className="w-full !max-w-full h-fit rounded-tablas overflow-hidden flex flex-col gap-2">
      <section className="w-full !max-w-full h-auto flex gap-2 overflow-hidden">
        <TablaBase
          className={`flex-1 ${className1}`}
          footer={false}
          rounded={false}
          headers={headers1}
        >
          {render1}
        </TablaBase>

        <div className="flex-1 w-[200px] overflow-y-clip scroll-hide overscroll-x-contain overflow-x-auto">
          <TablaBase
            className={`min-w-max ${className2}`}
            headers={headers2}
            rounded={false}
            footer={false}
          >
            {children || render2}
          </TablaBase>
        </div>

        <TablaBase
          className={`flex-1 ${className3}`}
          headers={headers3}
          rounded={false}
          footer={false}
        >
          {render3}
        </TablaBase>
      </section>

      <FooterPaginacion />
    </section>
  )
}
