require('dotenv').config()

// Datos de acceso
const AZURE_ENDPOINT = process.env.CHATGPT_ENDPOINT
const DEPLOYMENT_NAME = 'resident-evil-assistant'
const API_KEY = process.env.TOKEN_FOUNDRY
//const API_VERSION = '2025-04-01-preview'

async function responderChat(pregunta = '', historial = []){
    const url;

    // Preparamos el cuerpo de la peticion
    const body = {
        messages: [
          { role: "system", content: "Eres experto en Resident Evil." },
          ...historial,
          { role: "user", content:   pregunta }
        ],
        max_completion_tokens: 800,
        temperature: 0.7
    }

    const response = await fetch(url, {
        method: 'POST', 
        headers: {
            "Content-Type": "application/json",
            "api-key": API_KEY
        },
        body: JSON.stringify(body)
    })

    
    if(!response.ok){
        console.error('NO se accedio al servicio')
        return;
    }

    const data = await response.json()
    const mensaje = data.choices[0].message

    // Esta funcion devovera un objeto
    return {
        respuesta: mensaje.content,
        tokens_usados: data.usage.total_tokens,
        nuevo_historial: [...historial, {role: 'user', content: pregunta}, mensaje]
    }

}

(()=>{
    let historial = []
    // P1 - 
    console.log('-- Pregunta 1 --')

    let r1 = await preguntarAzure('¿Que es Resident Evil? dame una respuesta corta', historial)
    console.log(r1.respuesta)
    historial = r1.nuevo_historial

    // P2
    console.log('-- Pregunta 2 --')
    let r2 = await preguntarAzure('¿Cuales son los personajes principales?', historial)
    console.log(r2.respuesta)
    historial = r2.nuevo_historial 
    
    // P3
    console.log('-- Pregunta 3 --')
    let r3 = await preguntarAzure('¿En que juegos aparecen?', historial)
    console.log(r3.respuesta)
    historial = r3.nuevo_historial

    // Fin...
    console.log(`--- Tokens utilizados --`)
})()