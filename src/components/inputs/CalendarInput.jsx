import { useEffect, useRef, useState } from 'react'
import { Calendario } from '../../assets/icons/elements/Calendario'
import { Izquierda } from '../../assets/icons/elements/Izquierda'

// No esta fino para android
// Falta controlar algunos casos de uso como por ejemplo los swipes a la derecha o izquierda en android o poder colocar la fecha manualmente en un input
// tener en cuenta los dispositivos android o tablets.
// Este componente devuelve la fecha en formato MM/DD/YYYY
export function CalendarInput ({ className = '', name, ...props }) {
  const calendario = useRef()
  const calendarioInput = useRef()

  const daysHeader = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  const [hoy, setHoy] = useState(new Date())

  const [dia, setDia] = useState(hoy.getDate())
  const [mes, setMes] = useState(hoy.toLocaleDateString('es-PE', { month: 'long' }))
  const [year, setYear] = useState(hoy.getFullYear())

  const [renderCalendar, setRenderCalendar] = useState([])

  const [indicesMesActual, setIndicesMesActual] = useState([])

  const [inputValue, setInputValue] = useState(`${hoy.toLocaleDateString('es-PE', { month: '2-digit' })}-${dia}-${year}`)

  useEffect(() => {
    const [yearI, monthI, dateI] = [hoy.getFullYear(), hoy.getMonth(), hoy.getDate()]

    const firstDayOfTheCurrentMonth = new Date(yearI, monthI, 1).getDay()
    const lastDayOfTheCurrentMonth = new Date(yearI, monthI + 1, 0).getDay()

    const lastDateOfTheCurrentMonth = new Date(yearI, monthI + 1, 0).getDate()

    const daysOfPreviousMonth = Array(firstDayOfTheCurrentMonth)
      .fill(0)
      // aqui se recupera los dias en reversa, por ejemplo: 31, 30, 29, 28...
      // tambien se podria hacer lo mismo sin usar el .reverse() con el metodo reduceRight
      .map((_, i) => new Date(yearI, monthI, -i).getDate())
      .reverse()

    const daysOfCurrentMonth = Array(lastDateOfTheCurrentMonth)
      .fill(0)
      .map((_, i) => i + 1)

    const daysOfNextMonth = Array(7 - lastDayOfTheCurrentMonth - 1)
      .fill(0)
      .map((_, i) => i + 1)

    const calendario = [...daysOfPreviousMonth, ...daysOfCurrentMonth, ...daysOfNextMonth]

    const calendarioFinal = Array(42)
      .fill(null)
      .reduce((acc, _, i) => {
        const nuevoValor = calendario[i] ?? acc[i - 1] + 1

        return acc.concat(nuevoValor)
      }, [])

    setRenderCalendar(calendarioFinal)
    setDia(dateI)
    setMes(hoy.toLocaleDateString('es-pe', { month: 'long' }))
    setYear(yearI)

    setIndicesMesActual([firstDayOfTheCurrentMonth, calendario.length - daysOfNextMonth.length - 1])

    setInputValue(`${hoy.toLocaleDateString('es-PE', { month: '2-digit' })}-${dateI}-${yearI}`)

    setDayL(hoy.toLocaleDateString('es-PE', { day: '2-digit' }))
    setMonthL(hoy.toLocaleDateString('es-PE', { month: '2-digit' }))
    setYearL(hoy.toLocaleDateString('es-PE', { year: 'numeric' }))
  }, [hoy])

  function handleHeight () {
    const { current: calendar } = calendario

    calendar.classList.toggle('h-[290px]')
    calendar.classList.toggle('py-2')
  }

  const [dayL, setDayL] = useState(hoy.toLocaleDateString('es-PE', { day: '2-digit' }))
  const [monthL, setMonthL] = useState(hoy.toLocaleDateString('es-PE', { month: '2-digit' }))
  const [yearL, setYearL] = useState(hoy.toLocaleDateString('es-PE', { year: 'numeric' }))

  return (
    <section
      {...props}
      // establecer el width en 140px
      className={`relative flex items-center justify-between gap-3 h-9 py-2 px-3 border border-bordesIdle rounded-lg bg-[#f3f7ff] ${className}`}
    >
      <ul
        className='flex items-center'
      >
        <li
          tabIndex={0}
          className='focus-visible:outline-textoSuave'
          onKeyDown={e => {
            const numero = parseFloat(e.key.replace(/[^\d.]/g, ''))

            // Falta controlar casos de uso como este por ejemplo
            // const lastDayOfPrevMonth = new Date(year, hoy.getMonth(), 0).getDate()

            if (isNaN(numero)) return

            if (numero > 1) {
              setHoy(new Date(hoy.getFullYear(), hoy.getMonth(), numero))
              const siguienteElemento = e.currentTarget.nextElementSibling
              e.currentTarget.blur()

              siguienteElemento.focus()
            } else {
              setDayL(1)
            }
          }}
        >
          <span
            className='text-sm select-all selection:bg-slate-300 leading-4 font-normal text-textoPrincipal'
          >
            {dayL}
          </span>
        </li>

        /

        <li
          tabIndex={0}
          className='focus-visible:outline-textoSuave'
        >
          <span
            className='text-sm leading-4 font-normal text-textoPrincipal'
          >
            {monthL}
          </span>
        </li>

        /

        <li
          tabIndex={0}
          className='focus-visible:outline-textoSuave'
        >
          <span
            className='text-sm leading-4 font-normal text-textoPrincipal'
          >
            {yearL}
          </span>
        </li>
      </ul>

      <button
        onClick={handleHeight}
      >
        <Calendario color='#4C64A6' />
      </button>

      <input
        ref={calendarioInput}
        type='text'
        className='w-0 h-0 absolute opacity-0 inset-1/2'
        defaultValue={inputValue}
        readOnly
        name={name}
      />

      <section
        ref={calendario}
        className='absolute z-50 flex flex-col gap-3 top-10 left-0 right-0 size-[230px] h-0 px-2 py-0 transition-all duration-300 ease-in-out rounded-tarjetas bg-white shadow-1 shadow-sombras-principal'
      >
        <header
          className='flex items-center justify-between w-full h-4 overflow-hidden'
        >
          <strong
            className='texto-semi-bold-m text-textoTitulo'
          >
            {`${mes} ${year}`}
          </strong>

          <menu
            className='h-full w-9 flex items-center justify-between gap-xs'
          >
            <li>
              <button
                className='size-4 flex items-center justify-center rounded-full boton-secundario-marca p-0'
                onClick={() => {
                  const lastDayOfPrevMonth = new Date(year, hoy.getMonth(), 0).getDate()
                  if (dia > lastDayOfPrevMonth) {
                    const nuevoDia = dia - (dia % lastDayOfPrevMonth)

                    setHoy(new Date(year, hoy.getMonth() - 1, nuevoDia))
                    return
                  }

                  setHoy(new Date(year, hoy.getMonth() - 1, dia))
                }}
              >
                <Izquierda
                  className='size-2'
                  color='#7A94D8'
                />
              </button>
            </li>

            <li>
              <button
                className='size-4 flex items-center justify-center rounded-full boton-secundario-marca p-0'
                onClick={() => {
                  const lastDayOfNextMonth = new Date(year, hoy.getMonth() + 2, 0).getDate()
                  if (dia > lastDayOfNextMonth) {
                    const nuevoDia = dia - (dia % lastDayOfNextMonth)

                    setHoy(new Date(year, hoy.getMonth() + 1, nuevoDia))
                    return
                  }

                  setHoy(new Date(year, hoy.getMonth() + 1, dia))
                }}
              >
                <Izquierda
                  className='rotate-180 size-2'
                  color='#7A94D8'
                />
              </button>
            </li>
          </menu>
        </header>

        <section
          className='flex flex-col gap-3 overflow-hidden'
        >
          <header
            className='w-full max-w-full h-4'
          >
            <ul
              className='flex items-center h-full justify-between gap-3'
            >
              {
                daysHeader.map(day => (
                  <li
                    key={day}
                    className='w-5 h-full flex items-center'
                  >
                    <span
                      className='font-normal text-[10px] leading-4 text-textoSuave'
                    >
                      {day}
                    </span>
                  </li>
                ))
              }
            </ul>
          </header>

          <ul
            className='flex items-center justify-between gap-3 flex-wrap'
          >
            {
              renderCalendar.map((day, idx) => {
                return (
                  <li
                    className={`flex items-center justify-center size-5 select-none cursor-pointer ${day === dia && idx >= indicesMesActual[0] && idx <= indicesMesActual[1] ? 'bg-azul-500' : 'hover:bg-textoSuave/20'} transition-colors duration-200 ease-in-out rounded-full`}
                    onClick={() => {
                      handleHeight()

                      if (idx >= indicesMesActual[0] && idx <= indicesMesActual[1]) {
                        setHoy(new Date(year, hoy.getMonth(), day))
                        return
                      }

                      if (idx < indicesMesActual[0]) {
                        setHoy(new Date(year, hoy.getMonth() - 1, day))
                      } else if (idx > indicesMesActual[1]) {
                        setHoy(new Date(year, hoy.getMonth() + 1, day))
                      }
                    }}
                    key={idx}
                  >
                    <span
                      className={`texto-regular-s  ${day === dia && idx >= indicesMesActual[0] && idx <= indicesMesActual[1] ? 'text-white' : idx >= indicesMesActual[0] && idx <= indicesMesActual[1] ? 'text-textoPrincipal' : 'text-textoSuave'}`}
                    >
                      {day}
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </section>

        <footer
          className='w-fit max-h-[26px] overflow-hidden self-end'
        >
          <button
            className='boton-fantasma-marca p-1 px-3'
            onClick={() => {
              setHoy(new Date())

              handleHeight()
            }}
          >
            Hoy
          </button>
        </footer>
      </section>
    </section>
  )
}
