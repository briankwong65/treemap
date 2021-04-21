import React, { useState, useEffect } from 'react';
import * as styles from './styles.module.scss';
import classNames from 'classnames';
import Node from '../Node';

const Treemap = (props) => {
  const { className, dataList, row } = props;

  const [formattedData, setFormattedData] = useState(
    Array.from({ length: row }, () => [])
  );
  const [width, setWidth] = useState(1);

  useEffect(() => {
    const sortedDataList = JSON.parse(JSON.stringify(dataList)).sort((a, b) => {
      return b.weight - a.weight;
    });

    if (row >= sortedDataList.length) {
      const formattedDataTemp = Array.from({ length: row }, () => []);

      // sort the data list in decending order
      sortedDataList.forEach((data, index) => {
        formattedDataTemp[index].push(data);
      });
      setFormattedData(formattedDataTemp);
    } else {
      const weightSum = sortedDataList.reduce(
        (sum, cur) => sum + cur.weight,
        0
      );
      const width = Math.ceil(weightSum / row);
      let currentRow = 0;
      let remainingWidth = width;
      const dataListTemp = [...sortedDataList];
      const formattedDataTemp = Array.from({ length: row }, () => []);

      // add the data to the current row if there is enough remaining width, else, add to the next row
      while (currentRow < row) {
        let i = 0;
        while (dataListTemp.length > 0 && i < dataListTemp.length) {
          if (dataListTemp[i].weight <= remainingWidth) {
            remainingWidth -= dataListTemp[i].weight;
            formattedDataTemp[currentRow].push(dataListTemp[i]);
            dataListTemp.splice(i, 1);
            i = 0;
            if (remainingWidth === 0) {
              currentRow += 1;
              remainingWidth = width;
            }
          } else {
            i += 1;
          }
        }
        currentRow += 1;
        remainingWidth = width;
      }

      setWidth(width);
      setFormattedData(formattedDataTemp);

      if (dataListTemp.length > 0) {
        let rowsFull = true;
        for (const dataRow of formattedDataTemp) {
          if (dataRow.length === 0) {
            rowsFull = false;
          }
        }

        // if the rows are full, append to the first row
        if (rowsFull) {
          formattedDataTemp[0].push(dataListTemp[0]);
        } else {
          // else, add the data on the first row alone
          const temp = Array.from({ length: row }, () => []);
          temp[0].push(dataListTemp[0]);
          formattedDataTemp.forEach((dataRow, index) => {
            temp.push(dataRow);
          });

          setFormattedData(temp);
        }
      }
    }
  }, [dataList, row]);

  return (
    <div className={classNames(styles.treemap, className)}>
      <div style={{display: 'inline-block'}}>
        {formattedData.map((dataRow, row) => {
          return (
            <div key={`row-${row}`} style={{ textAlign: 'left' }}>
              {dataRow.map((data, index) => {
                return (
                  <Node
                    key={`data-${row}-${index}`}
                    name={data.name}
                    width={data.weight / width}
                    value={data.value}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Treemap;
