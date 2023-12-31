import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Swal from 'sweetalert2'

const BudgetControl = ({ presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.precio*gasto.cantidad + total, 0)
        const totalDisponible = presupuesto - totalGastado
        // calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setDisponible(totalDisponible)
        setGastado(totalGastado)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
    }, [gastos])

    // cambia el formato del presupuesto
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        Swal.fire({
            title: 'Estas seguro de que deseas resetear la app?',
            text: "Perderas todo los gastos!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#DC2626',
            cancelButtonColor: '#6E7881',
            confirmButtonText: 'Si, resetear!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Reseteado!',
                    'La app se ha reseteado',
                    'success'
                )
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
            }
        })
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar value={porcentaje} text={`${porcentaje}% Gastado`}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#1D4ED8',
                        trailColor: '#F5F5F5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#1D4ED8'
                    })} />
            </div>
            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={handleResetApp}>Resetear App</button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default BudgetControl