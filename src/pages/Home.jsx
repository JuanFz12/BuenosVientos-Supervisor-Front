import businessMan from '/src/assets/img/businessMan.jpeg'

import { apiRequest } from '../consts/api'
import { TIPOS_USUARIOS, TOKEN_NAME } from '../consts/consts'
import { routes } from '../routes'
import { createData } from '../services/createData'
import { atenuarFormulario } from '../utils/atenuarFormulario'
import { LabelText } from '../components/labels/LabelText'
import { PasswordInput } from '../components/inputs/PasswordInput'
import { NormalCheck } from '../components/checkbox/Checkbox'
import { Link } from 'react-router-dom'

const rememberPassword = 'rm-p'

export function Home () {
  const fields = {
    email: 'email',
    password: 'password',
    remember: 'remember'
  }

  function handleSubmit (e) {
    e.preventDefault()

    const form = new FormData(e.target)
    form.delete(fields.remember)

    const url = apiRequest.login
    const body = Object.fromEntries(form)

    atenuarFormulario({ form: e.target })

    createData({ url, body })
      .then(data => {
        if (data.type_user !== TIPOS_USUARIOS.supervisor) {
          Promise.reject(new Error('No eres administrador'))
        }

        localStorage.setItem(TOKEN_NAME, data.token)

        if (e.target[fields.remember].checked) {
          const pass = btoa(body.password)
          localStorage.setItem(rememberPassword, pass)
        } else {
          localStorage.removeItem(rememberPassword)
        }

        location.replace(routes.dashboard)
      })
      .catch(err => alert(`Error: ${err.error ?? err.message ?? 'Error desconocido'}`))
      .finally(() => {
        atenuarFormulario({ form: e.target, restore: true })
      })
  }

  return (
    <main
      className='flex min-h-screen h-screen max-h-screen overflow-clip lgMax:bg-[url(/src/assets/img/businessMan.jpeg)] bg-no-repeat bg-cover'
    >
      <section
        className='hidden lg:block h-full flex-1'
      >
        <img
          className='h-full object-cover object-left-top'
          src={businessMan}
        />
      </section>

      <section
        className='relative flex justify-center items-center h-full p-[100px] lgMax:backdrop-blur-xl bg-[rgba(177,177,177)] bg-opacity-70 lg:bg-white w-full lg:w-[568px]'
      >
        <header
          className='absolute top-10 right-10 w-[215px] h-[55px]'
        >
          <img
            className='w-full h-full'
            src='/LogoBuenosVientos.jpeg'
          />
        </header>

        <form
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-[50px]'
        >
          <header
            className='flex flex-col justify-between gap-5'
          >
            <h1
              className='titulo-h4 text-azul-500'
            >
              Ingrese a su sesión
            </h1>
            <span
              className='texto-regular-m text-textoPrincipal'
            >
              Ingrese sus credenciales para ingresar a su cuenta.
            </span>
          </header>

          <fieldset
            className='flex flex-col gap-5'
          >
            <LabelText
              label='Correo electrónico'
              placeholder='Ingrese su dirección de correo electrónico'
              type='email'
              name={fields.email}
              autoComplete='off'
              required
            />

            <LabelText
              label='Contraseña'
            >
              <PasswordInput
                defaultValue={
                  localStorage.getItem(rememberPassword)
                    ? atob(localStorage.getItem(rememberPassword))
                    : ''
                }
                placeholder='******'
                name={fields.password}
                required
              />
            </LabelText>

            <fieldset
              className='flex justify-between items-center gap-2'
            >
              <label
                className='flex gap-2 h-4 items-center w-max'
              >
                <NormalCheck
                  defaultChecked={
                    Boolean(localStorage.getItem(rememberPassword))
                  }
                  labelClass='scale-[0.8]'
                  name={fields.remember}
                  styleCheck='semi'
                />

                <span
                  className='text-[#737373] texto-regular-s'
                >
                  Recordar contraseña
                </span>
              </label>

              <Link
                to={routes.recoverPassword}
                reloadDocument
                className='texto-regular-s text-azul-500 hover:underline'
              >
                Olvidé mi contraseña
              </Link>
            </fieldset>

          </fieldset>

          <button
            className='boton-primario-marca h-12 rounded-xl'
            type='submit'
          >
            Iniciar sesión
          </button>

        </form>
      </section>
    </main>
  )
}
