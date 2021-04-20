import React, { useCallback, useEffect } from 'react';
import * as styles from './styles.module.scss';
import classNames from 'classnames';
import Node from '../Node';

const Treemap = (props) => {
  const { className, dataList, row } = props;
  
  useEffect(() => {
    const sortedDataList = JSON.parse(JSON.stringify(dataList)).sort((a, b) => {
      return b.weight - a.weight;
    });
    const weightSum = sortedDataList.reduce((sum, cur) => sum + cur.weight, 0);
    const width = Math.ceil(weightSum / row);
    const formattedData = Array.from({length: row}, () => [])
    let currentRow = 0;
    let remainingWidth = width;
    console.log('dataList', sortedDataList);
    console.log('row', row);
    const dataListTemp = [...sortedDataList];
    while (currentRow < row) {
      let i = 0;
      while (dataListTemp.length > 0 && i < dataListTemp.length){
        if (dataListTemp[i].weight <= remainingWidth){
          // console.log('currentRow', currentRow);
          // console.log("remainingWidth", remainingWidth );
          // console.log("weight", dataListTemp[i].weight);
          remainingWidth -= dataListTemp[i].weight;
          formattedData[currentRow].push(dataListTemp[i]);
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
    console.log('formatted data', formattedData);
  }, [dataList, row]);
  
  return (
    <div className={classNames(styles.container, className)}>
      {dataList.map((data, index) => {
        return (
          <Node
            key={`data-${index}`}
            name={data.name}
            weight={data.weight}
            value={data.value}
          />
        );
      })}
    </div>
  );
};

export default Treemap;
