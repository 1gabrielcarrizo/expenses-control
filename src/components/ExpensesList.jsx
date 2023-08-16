import React from 'react'
import Expense from './Expense'

const ExpensesList = ({gastos}) => {
  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length ? 'gastos' : 'no hay gastos todavia'}</h2>
        {gastos.map((gasto) => (
            <Expense key={gasto.id} gasto={gasto}/>
        ))}
    </div>
  )
}

export default ExpensesList