import React, { useState } from 'react'
import Message from './Message'

const NewBudget = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

  const [mensaje, setMensaje] = useState('')

  const handlePresupuesto = (e) => {
    e.preventDefault()
    if(presupuesto <= 0){
      setMensaje('No es un presupuesto valido')
      return
    }
    setMensaje('')
    setIsValidPresupuesto(true)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form className='formulario' onSubmit={handlePresupuesto}>
            <div className="campo">
                <label htmlFor='presupuesto'>Definir presupuesto</label>
                <input
                id='presupuesto'
                className='nuevo-presupuesto'
                type="number"
                placeholder='Añade tu presupuesto'
                value={presupuesto}
                onChange={e => setPresupuesto(Number(e.target.value))} />
            </div>
            <input type="submit" value='Añadir' />
            {mensaje && <Message tipo='error'>{mensaje}</Message>}
        </form>
    </div>
  )
}

export default NewBudget