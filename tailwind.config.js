/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bordesIdle: '#a9bcf0',
        textoPrincipal: '#18273a',
        textoTitulo: '#4c64a6',
        bordesSeparador: '#dce5ff',
        dashboardGraficoColor1: '#dce5ff',
        dashboardGraficoColor2: '#4c64a6',
        dashboardGraficoColor3: '#a9bcf0',
        superficiesInputEditable: '#F3F7FF',
        textoSuave: '#98A2B3',
        verdeExito: {
          100: '#effff6',
          600: '#0cab61',
          700: '#037948'
        },
        verdeMarca: {
          100: '#f5fff7',
          500: '#5EBA6E',
          600: '#358643',
          700: '#195E25'
        },
        rojoMarca: {
          100: '#FFF0EF',
          600: '#E43530'
        },
        wireframe: {
          0: '#f9fafb',
          100: '#f3f3f3',
          200: '#d9d9d9',
          300: '#a6a4a4',
          400: '#737373',
          500: '#525252'
        },
        neutrales: {
          100: '#f9fafb',
          200: '#f2f4f7',
          300: '#e4e7ec',
          400: '#d0d5dd',
          500: '#98a2b3',
          600: '#667085',
          700: '#3d4b60',
          800: '#18273a',
          900: '#060d1a'
        },
        azulMarca: {
          100: '#F3F7FF'
        },
        azul: {
          100: '#e0e9ff',
          200: '#b5c6f4',
          300: '#93a7de',
          400: '#7188c5',
          500: '#4c64a6',
          600: '#314886',
          700: '#3d4b60',
          800: '#18273a',
          900: '#060d1a'
        },
        azulVariante: {
          100: '#eff3ff',
          200: '#cad8ff',
          300: '#98b2fc',
          400: '#5c81ea',
          500: '#305bd3',
          600: '#103dbc',
          700: '#0a2f96',
          800: '#042171',
          900: '#021342'
        },
        celeste: {
          100: '#F0F9FF',
          500: '#0BA5EC',
          600: '#0086C9'
        },
        amarilloAdvertencia: {
          100: '#FFFAEB',
          600: '#EE8C0B',
          700: '#B54708'
        },
        sombras: {
          principal: '#dce5ff'
        }
      },
      gap: {
        xs: '4px',
        s: '8px',
        m: '20px',
        l: '32px',
        xl: '52px',
        botones: '20px'
      },
      borderRadius: {
        boton: '8px',
        componentes: '8px',
        tarjetas: '16px',
        tablas: '20px',
        modal: '32px'
      },
      width: {
        modalS: '400px',
        modalM: '500px'
      },
      fontFamily: {
        'dm-sans': 'var(--dm-sans)'
      },
      boxShadow: {
        1: '0 4px 12px rgb(0 0 0 / 0.15)'
      }
    },
    screens: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1080px',
      lgMax: { max: '1079px' },
      xl: '1280px',
      '2xl': '1536px'
    }
  },
  plugins: []
}
