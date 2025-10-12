import React, { FC } from 'react';
import { OrderStatusProps } from './type';
import { OrderStatusUI } from '@ui';

const statusText: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  let textStyle = '';
  let statusTextValue = '';

  switch (status) {
    case 'pending':
      textStyle = '#E52B1A';
      statusTextValue = 'Готовится';
      break;
    case 'done':
      textStyle = '#00CCCC';
      statusTextValue = 'Выполнен';
      break;
    case 'created':
      textStyle = '#F2F2F3';
      statusTextValue = 'Создан';
      break;
    default:
      textStyle = '#F2F2F3';
      statusTextValue = 'Неизвестно';
  }

  return <OrderStatusUI textStyle={textStyle} text={statusTextValue} />;
};
