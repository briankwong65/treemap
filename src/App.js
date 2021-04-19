import './App.css';
import Treemap from './components/Treemap';
import DataInput from './components/DataInput';
import { useCallback, useState } from 'react';

const App = () => {
  const [data, setData] = useState([]);
  const [row, setRow] = useState(1);

  const dataOnChange = useCallback((newData) => {
    try {
      newData = JSON.parse(newData);
      console.log(newData);
      setData(newData);
    } catch (err) {}
  }, []);

  const rowOnChange = useCallback((newRow) => {
    setRow(newRow);
  }, []);

  return (
    <div className='App'>
      <DataInput
        className='DataInput'
        dataOnChange={dataOnChange}
        rowOnChange={rowOnChange}
        data={data}
        row={row}
      />
      <Treemap className='Treemap' data={data} row={row} />
    </div>
  );
};

export default App;
