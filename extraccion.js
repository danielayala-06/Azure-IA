/* 
    Este servicio permite identificar datos (informacion) clave en un documento Telefonos, nombres, edad, direccion, etc. 
*/

require('dotenv').config()

// Acceder a las variables
const suscriptionkey = process.env.RECONGNITION_API_FOUNDRY
const endpoint = process.env.FOUNDRY_ENPOINT

const url = `${endpoint}/language/:analyze-text?api-version=2023-04-01`

async function extraerDatos(){
    try {
        
    } catch (error) {
        console.error(error.message)
    }
}