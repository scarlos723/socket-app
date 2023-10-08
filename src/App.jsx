import { useEffect, useState } from 'react'
import './App.css'

function App () {
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState()
  const [fooEvents, setFooEvents] = useState([])
  const [ws, setWs] = useState(null)
  function handlerSubmit (e) {
    e.preventDefault()
    console.log('semd message', message)
    if (ws) {
      ws.send('Hola desde React!')
      console.log('Mensaje enviado')
    }
  }
  useEffect(() => {
    const websocket = new WebSocket('ws://tu-servidor-websocket.com')
    websocket.onopen = () => {
      setIsConnected(true)
      console.log('Conectado a WebSocket')
    }
    websocket.onmessage = (event) => {
      setFooEvents((fooEvents) => [...fooEvents, event.data])
      console.log('Mensaje recibido:', event.data)
    }
    websocket.onerror = (error) => {
      console.error('Error en WebSocket:', error)
    }
    websocket.onclose = (event) => {
      setFooEvents([])
      if (event.wasClean) {
        console.log('Conexión cerrada limpiamente')
      } else {
        console.error('Desconexión abrupta')
      }
    }

    setWs(websocket)

    // Desconectar al desmontar el componente
    return () => {
      websocket.close()
      console.log('WebSocket desconectado')
    }
  }, [])

  return (
    <>
      <section>
        <h2>
          Socket app
        </h2>
        {
          isConnected ? <p>Connected</p> : <p>Not connected</p>
        }
      {/* <ConnectionState isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <ConnectionManager /> */}
      <form onSubmit={handlerSubmit} action="">
      <input type="text" placeholder='write message...' onChange={(e) => setMessage(e.target.value)} />
      <button>Send</button>
      </form>

      </section>
    </>
  )
}

export default App
