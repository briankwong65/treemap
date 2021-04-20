import React, { useState, useEffect } from 'react';
import * as styles from './styles.module.scss';
import classNames from 'classnames';
import Node from '../Node';

const Treemap = (props) => {
  const { className, dataList, row } = props;

  const [formattedData, setFormattedData] = useState(Array.from({length: row}, () => []));
  const [weightSum, setWeightSum] = useState(1);
  const [width, setWidth] = useState(1);
  
  useEffect(() => {
    const sortedDataList = JSON.parse(JSON.stringify(dataList)).sort((a, b) => {
      return b.weight - a.weight;
    });
    const weightSum = sortedDataList.reduce((sum, cur) => sum + cur.weight, 0);
    const width = Math.ceil(weightSum / row);
    let currentRow = 0;
    let remainingWidth = width;
    console.log('dataList', sortedDataList);
    console.log('row', row);
    const dataListTemp = [...sortedDataList];
    const formattedDataTemp = Array.from({length: row}, () => []);
    while (currentRow < row) {
      let i = 0;
      while (dataListTemp.length > 0 && i < dataListTemp.length){
        if (dataListTemp[i].weight <= remainingWidth){
          // console.log('currentRow', currentRow);
          // console.log("remainingWidth", remainingWidth );
          // console.log("weight", dataListTemp[i].weight);
          remainingWidth -= dataListTemp[i].weight;
          formattedDataTemp[currentRow].push(dataListTemp[i]);
          dataListTemp.splice(i, 1);
          i = 0;   
          if (remainingWidth === 0) {
            currentRow += 1;
            remainingWidth = width;
          }       
        }
        else {
          i += 1;
        }
      }
      currentRow += 1;
      remainingWidth = width;
    }

    setWeightSum(weightSum);
    setWidth(width);
    setFormattedData(formattedDataTemp);
    console.log('formatted data', formattedDataTemp);
  }, [dataList, row]);
  
  return (
    <div className={classNames(styles.container, className)}>
      {
        formattedData.map((dataRow, row) => {
          console.log('dataRow', dataRow);
          return(
            dataRow.map((data, index) => {
              console.log('data', data.weight/width);
              return (
                <Node
                  key={`data-${row}-${index}`}
                  name={data.name}
                  width={data.weight/width}
                  totalWidth={width}
                  value={data.value}
                />
              );
            })
        )})
      }
    </div>
  );
};

export default Treemap;
