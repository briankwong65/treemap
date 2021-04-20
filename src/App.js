import './App.css';
import Treemap from './components/Treemap';
import DataInput from './components/DataInput';
import { useCallback, useState } from 'react';

const App = () => {
  const [dataList, setDataList] = useState([]);
  const [row, setRow] = useState(1);

  const dataListOnChange = useCallback((newDataList) => {
    try {
      newDataList = JSON.parse(newDataList);
      setDataList(newDataList);
      console.log("changed dataList");
      console.log(dataList);
    } catch (err) {}
  }, [dataList]);

  const rowOnChange = useCallback((newRow) => {
    if (newRow > 0) {
      setRow(newRow);
      console.log("changed row");
    }
  }, []);

  return (
    <div className='App'>
      <DataInput
        className='DataInput'
        dataListOnChange={dataListOnChange}
        rowOnChange={rowOnChange}
        row={row}
      />
      <Treemap className='Treemap' dataList={dataList} row={row} />
    </div>
  );
};

export default App;
