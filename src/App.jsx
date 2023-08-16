import React, { useState } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './assets/img/nuevo-gasto.svg'
import Modal from './Modal'

const App = () => {
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)

  const handleNuevoGasto = () => {
    setModal(true)
  }

  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto} />

      {isValidPresupuesto && (

        <div className="nuevo-gasto">
          <img src={IconoNuevoGasto} alt="icono-nuevo-gasto" onClick={handleNuevoGasto} />
        </div>
      )}

      {modal && <Modal setModal={setModal}/>}
    </div>
  )
}

export default App