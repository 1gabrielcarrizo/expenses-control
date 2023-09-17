import React, { useEffect, useState } from 'react'
import CerrarBtn from '../assets/img/cerrar.svg'
import Message from './Message'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setPrecio(gastoEditar.precio)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])


    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    // validar el modal
    const handleSubmit = (e) => {
        e.preventDefault()
        if ([nombre, precio, cantidad, categoria].includes('')) {
            setMensaje('Todos los campos son obligatorios')
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return
        }
        // si todo esta bien, guarda el gasto
        guardarGasto({ nombre, precio, cantidad, categoria, id, fecha })
    }

    return (
        <div className='modal'>
            <div className="cerrar-modal">
                <img src={CerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
            </div>

            <form onSubmit={handleSubmit} className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}>
                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {mensaje && <Message tipo='error'>{mensaje}</Message>}

                <div className="campo">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        id='nombre'
                        type="text"
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)} />
                </div>

                <div className="campo">
                    <label htmlFor="precio">Precio</label>
                    <input
                        min={0}
                        id='precio'
                        type="number"
                        placeholder='Añade el precio, ej: 300'
                        // value={precio}
                        value={precio === 0 ? '' : precio}
                        onChange={e => setPrecio(Number(e.target.value))} />
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        min={0}
                        id='cantidad'
                        type="number"
                        placeholder='Añade la cantidad, ej: 2'
                        // value={cantidad}
                        value={cantidad === 0 ? '' : cantidad}
                        onChange={e => setCantidad(Number(e.target.value))} />
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoria</label>
                    <select
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}
                    >
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />
            </form>
        </div>
    )
}

export default Modal