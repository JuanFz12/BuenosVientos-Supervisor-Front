import { COLORES_ETIQUETAS } from '../../../components/etiquetas/consts/etiquetas'

const colors = COLORES_ETIQUETAS

export const apiEstadosEditables = {
  asignado: 'Approved',
  enProceso: 'InProgress',
  completo: 'Completed',
  cancelado: 'Cancelled'
}

export const apiEstados = {
  enEspera: 'Submitted',
  ...apiEstadosEditables
}

// Estos son los estados desde que no se pueden editar, por ejemplo:
// Si estas en estado completo, no puede cambiar a ningun otro estado, solo se puede cambiar de un estado
// diferente al de esta lista, por ejemplo --> asignado --> enEspera || asignado --> completo, y asi
export const estadosNoEditables = {
  [apiEstados.completo]: apiEstados.completo,
  [apiEstados.cancelado]: apiEstados.cancelado,
  [apiEstados.enEspera]: apiEstados.enEspera
}

export const tagStatus = {
  [apiEstados.enEspera]: {
    text: 'En espera',
    color: colors.celeste
  },
  [apiEstados.asignado]: {
    text: 'Asignado',
    color: colors.amarillo
  },
  [apiEstados.enProceso]: {
    text: 'En proceso',
    color: colors.neutral
  },
  [apiEstados.completo]: {
    text: 'Completo',
    color: colors.verde
  },
  [apiEstados.cancelado]: {
    text: 'Cancelado',
    color: colors.rojo
  }
}

export const optionsEstados = Object
  .entries(apiEstadosEditables)
  .map(([_, value]) => ({
    label: tagStatus[value].text,
    value,
    color: tagStatus[value].color
  }))
