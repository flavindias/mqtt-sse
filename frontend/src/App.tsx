import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [ temperatures, setTemperatures ] = useState<{
    received: Date,
    data: string
  }[]>([]);
  const [ listening, setListening ] = useState(false);

  useEffect( () => {
    if (!listening) {
      const events = new EventSource('http://localhost:3000/events');

      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        const { data } = JSON.parse(parsedData.message);
        setTemperatures((temperatures) => temperatures.concat({
          received: new Date(),
          data
        }));
      };

      setListening(true);
    }
  }, [listening, temperatures]);

  return (
    <>
      <table className="stats-table">
      <thead>
        <tr>  
          <th>Received</th>
          <th>Temperature</th>
        </tr>
      </thead>
      <tbody>
        {
          temperatures.map((temperature, i) =>
            <tr key={i}>
              <td>{temperature.received.toLocaleTimeString()}</td>
              <td>{`${temperature.data}˚C` }</td>
            </tr>
          )
        }
      </tbody>
    </table>
    </>
  )
}

export default App
