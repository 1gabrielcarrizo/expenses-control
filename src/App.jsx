import React, { useState } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './assets/img/nuevo-gasto.svg'
import Modal from './components/Modal'
import { generarId } from './helpers'
import ExpensesList from './components/ExpensesList'

const App = () => {
  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState([])

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = (gasto) => {
    gasto.id = generarId()
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])

    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
      gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto} />

      {isValidPresupuesto && (
        <>
        <main>
          <ExpensesList gastos={gastos}/>
        </main>
        <div className="nuevo-gasto">
          <img src={IconoNuevoGasto} alt="icono-nuevo-gasto" onClick={handleNuevoGasto} />
        </div>
        </>
      )}

      {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} />}
    </div>
  )
}

export default App