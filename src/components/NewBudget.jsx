import React, { useState } from 'react'
import Message from './Message'

const NewBudget = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

  const [mensaje, setMensaje] = useState('')

    // validamos el presupuesto
  const handlePresupuesto = (e) => {
    e.preventDefault()
        // si no hay presupuesto o es menor que 0...
    if(presupuesto <= 0){
      setMensaje('Ingresa un número mayor que 0')
      return
    }
        // en caso de que el numero sea valido, limpiamos el mensaje
    setMensaje('')
    setIsValidPresupuesto(true) // el presupuesto es valido
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
                min={0}
                placeholder='Añade tu presupuesto'
                // value={presupuesto}
                value={presupuesto === 0 ? '' : presupuesto}
                // en la linea de abajo agregamos el "Number"
                onChange={e => setPresupuesto(Number(e.target.value))} />
            </div>
            <input type="submit" value='Añadir' />
            {mensaje && <Message tipo='error'>{mensaje}</Message>}
        </form>
    </div>
  )
}

export default NewBudget