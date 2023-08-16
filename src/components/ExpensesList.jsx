import React from 'react'
import Expense from './Expense'

const ExpensesList = ({gastos, setGastoEditar, eliminarGasto}) => {
  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length ? 'gastos' : 'no hay gastos todavia'}</h2>
        {gastos.map((gasto) => (
            <Expense key={gasto.id} gasto={gasto} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto}/>
        ))}
    </div>
  )
}

export default ExpensesList