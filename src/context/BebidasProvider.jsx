import { useState, useEffect, createContext } from 'react'
import axios from 'axios'

const BebidasContext = createContext()

const BebidasProvider = ({children}) => {
    const [ bebidas, setBebidas ] = useState([])
    const [ modal, setModal ] = useState(false)
    const [ bebidaId, setBebidaId] = useState(null)
    const [ receta, setReceta ] = useState({})
    const [ cargando, setCargando ] = useState(false)

    const consultarBebida = async datos => {

        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`

            const { data: {drinks} } = await axios(url)
            
            setBebidas(drinks)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      const obtenerReceta = async () => {
        setCargando(true)
        if(!bebidaId) return

        try {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`
            const { data: {drinks} } = await axios(url)
            setReceta(drinks[0])
        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
      }

      obtenerReceta()
    }, [bebidaId])
    

    const handleModalClick = () => {
        setModal(!modal)
    } 

    const handleBebidaId = id => {
        setBebidaId(id)
    }

    return (
        <BebidasContext.Provider
            value={{
                consultarBebida,
                bebidas,
                handleModalClick,
                modal,
                handleBebidaId,
                receta,
                setReceta,
                cargando,
                bebidaId
            }}
        >
            {children}
        </BebidasContext.Provider>
    )
}

export {
    BebidasProvider
}

export default BebidasContext