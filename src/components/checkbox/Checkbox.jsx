// import { useState } from 'react'
import { Check } from '../../assets/icons/elements/Check'
import './Checkbox.css'

/**
 * @param {object} props - Props para el componente.
 * @param {string} props.name - El nombre del campo del checkbox.
 * @param {string} props.labelClass - La clase CSS para el label.
 * @param {'semi' | 'full'} props.styleCheck - El estilo del checkbox, por defecto es 'semi'.
 * @param {boolean} props.defaultChecked - El estado inicial por defecto del checkbox.
 * @returns {JSX.Element} El elemento JSX que representa el checkbox.
 */
export function NormalCheck ({ name, labelClass = '', styleCheck = 'semi', defaultChecked, ...props }) {
  return (
    <label
      className={`checkbox-base transition-shadow has-[input:focus-visible]:ring w-5 h-5 check-${styleCheck} ${labelClass}`}
    >
      <input
        {...props}
        name={name}
        defaultChecked={defaultChecked}
        type='checkbox'
      />
      <Check />
    </label>
  )
}
