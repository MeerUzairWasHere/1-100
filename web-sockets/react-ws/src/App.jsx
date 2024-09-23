import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage]=useState("")
  
  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
    setSocket(newSocket);
      newSocket.send('Hello Server!');
    }
    newSocket.onmessage = (message) => { 
      console.log('Message received:', message.data);
      setMessage(message?.data)
    }
    return () => newSocket.close();
  }, [])
  
  if(!socket){
    return <h1>Loading...</h1>
  }
  return (
    <>
      <input  onChange={(e)=>{
        setMessage(e.target.value)
      }} />
      <button onClick={(e)=>{
        socket.send(message)
      }}>Send</button>
      <br/>
      <span>Latest message: </span>{message}
    </>
  )
}

export default App