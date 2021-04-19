import React from 'react';
import * as styles from './styles.module.scss';
import classNames from 'classnames';
import Node from '../Node';

const Treemap = (props) => {
  const { className, data, row } = props;
  data.sort((a, b) => {
    return b.weight - a.weight;
  });
  const weightSum = data.reduce((sum, cur) => sum + cur.weight, 0);
  const minWidth = Math.ceil(weightSum / row);
  return (
    <div className={classNames(styles.container, className)}>
      {data.map((data, index) => {
        return (
          <Node
            key={`data-${index}`}
            name={data.name}
            weight={data.weight}
            value={data.value}
          />
        );
      })}
      <div>{minWidth}</div>
    </div>
  );
};

export default Treemap;
