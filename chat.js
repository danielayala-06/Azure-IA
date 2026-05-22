/**
 * Utiliza el LLM Phi-4 de Microsoft 
 * Require la activacion de Microsoft.Web (Suscripcion> Configuracion> Proveedores de recursos)
 */
require('dotenv').config()

// Datos de acceso

const endPointURL = process.env.MODEL_IA_ENDPOINT
const token = process.env.TOKEN_FOUNDRY

// Configuracion del LLM
const data = {
    model: 'Phi-4',
    messages: [
        {role: 'user', content: '¿Que es la memoria RAM? Dame una respuesta corta'}
    ]
}

//Consulta
fetch(endPointURL, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': `application/json`
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(data => {
    console.log(`Respuesta completa: ${data}`)
    if(data.choices&& data.choices.length > 0){
        console.log(`Respuesta corta: ${data.choices[0].message.content}`)
    }else{
        console.log('No se encontro contenido para la respuesta')
    }
})
.catch(e=> {console.error(e)})