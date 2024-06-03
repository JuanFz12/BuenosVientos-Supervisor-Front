import { Select } from '../select/Select'
import { colorEtiquetasOptions } from './consts/etiquetas'

/**
 * @typedef {'verde' | 'celeste' | 'amarillo' | 'neutral' | 'rojo'} Color
 *
 * @param {object} props
 * @param {string} props.className - Clase CSS para el contenedor
 * @param {string} props.listClass - Clase CSS para la lista
 * @param {number} props.maxVisibleOptions - Cantidad de opciones visibles
 * @param {boolean} props.visibleScroll - Indica si se debe mostrar la barra de desplazamiento de la lista
 * @param {Color} props.color - Color de la etiqueta
 * @param {boolean} props.disabled - Indica si el select esta deshabilitado
 * @param {function({value: string | number | null, label: string}): void} props.fnDisabled - Función que se ejecuta para indicar cuando el select debe deshabilitarse, retorna true para deshabilitar
 * @param {string | number} props.selected - Es el value de un objeto de las options, es lo que sera seleccionado por defecto. Solo debe usarse esta prop si (fnSelected) no esta definido.
 * @param {function({value: string | number, label: string}): boolean} props.fnSelected - Función que se ejecuta para seleccionar un valor por defecto, la funcion debe retornar un boolean para determinar que elemento sera seleccionado, true --> Value selected, false --> No selected. Solo debe usarse esta prop si (selected) no esta definido.
 * @param {Array<{label: string | number, value: string | number, color: Color}>} props.options - Lista de objetos que tienen el atributo 'label' y 'value', opcional 'img'
 * @param {function({value: string, label: string}): void} props.onChange - Función que se ejecuta al cambiar el valor,
 * @param {boolean} props.listUp - Indica si la lista se muestra hacia arriba, por defecto se muestra hacia abajo
 *
 * @returns {JSX.Element}
 */
export function EtiquetaSelect ({ className = '', listClass = '', maxVisibleOptions, visibleScroll = true, color: colorProp, disabled, fnDisabled, selected, fnSelected, options, onChange, listUp, ...props }) {
  const {
    bg: bgColor,
    arrowColor,
    text: textColor
  } = colorEtiquetasOptions[colorProp]

  return (
    <Select
      {...props}
      className={`${bgColor} [&_li]:!overflow-visible [&_li]:!text-wrap !h-6 rounded-[4px] gap-1.5 border-none ${className}`}
      labelClass={`${textColor} text-xs font-medium leading-[14.5px]`}
      disabled={disabled}
      maxVisibleOptions={maxVisibleOptions}
      visibleScroll={visibleScroll}
      listClass={`border-none gap-2 ${bgColor}`}
      fnDisabled={fnDisabled}
      options={options}
      fnSelected={fnSelected}
      onChange={onChange}
      listUp={listUp}
      selected={selected}
      arrowWidth={8}
      arrowHeight={8}
      arrowColor={arrowColor}
    />
  )
}
