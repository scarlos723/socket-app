
import { useEffect, useState } from 'react'
import './App.css'
import { socket } from './socket';
import ConnectionState from './components/ConnectionState';
import Events from './components/Events';
import  ConnectionManager  from './components/ConnectionManager';

function App() {  
  const [message, setMessage] = useState('')
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  function handlerSubmit(e) {
    e.preventDefault()
    console.log('semd message', message)
  }
  useEffect(() => {

    function onConnect() {
      setIsConnected(true);
    }
  
    function onDisconnect() {
      setIsConnected(false);
    }
  
    function onFooEvent(value) {
      setFooEvents(previous => [...previous, value]);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);
  return (
    <>
      <section>
        <h2>
          Socket app
        </h2>

      <ConnectionState isConnected={ isConnected } />
      <Events events={ fooEvents } />
      <ConnectionManager />

        <form onSubmit={handlerSubmit} action="">
        <input type="text" placeholder='write message...' onChange={(e)=>setMessage(e.target.value)} />
        <button>Send</button>
        </form>
        
      </section>
    </>
  )
}

export default App
