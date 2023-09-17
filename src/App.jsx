import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './assets/img/nuevo-gasto.svg'
import Modal from './components/Modal'
import { generarId } from './helpers'
import ExpensesList from './components/ExpensesList'
import Filter from './components/Filter'
import Footer from './components/Footer'

const App = () => {
  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto')) || 0) // valor inicial del presupuesto
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false) // permite ver la otra pantalla si es true
  const [modal, setModal] = useState(false) // oculta el modal por defecto
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) || []) // contiene todos los gastos
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto || 0)
  }, [presupuesto])

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) || [])
  }, [gastos])

  useEffect(() => {
    if (filtro) {
      // filtrar gastos por categoria
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])


  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) || 0
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])

  // abrir el modal
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      // actualizar
      const gastosActualizados = gastos.map((gastoState) => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})
    } else {
      // nuevo gasto
      gasto.id = generarId()
      gasto.fecha = Date.now()
      // hacemos una copia del array y agregamos el nuevo gasto
      setGastos([...gastos, gasto])
    }
    // ocultamos el modal una vez guardamos el nuevo gasto
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        setGastos={setGastos} />

      {/* si es presupuesto es valido, muestra el icono del modal para añadir un gasto */}
      {isValidPresupuesto && (
        <>
          <main>
            <Filter
              filtro={filtro}
              setFiltro={setFiltro} />
            <ExpensesList
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados} />
          </main>
          <div className="nuevo-gasto">
            <img src={IconoNuevoGasto} alt="icono-nuevo-gasto" onClick={handleNuevoGasto} />
          </div>
          {/* <Footer /> */}
        </>
      )}
      <Footer />
      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar} />}
    </div>
  )
}

export default App