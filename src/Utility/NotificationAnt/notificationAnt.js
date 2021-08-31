import { notification } from 'antd';

export const notificationAnt = (type, message, description) => {
  notification[type]({
    // success ,info, warning, err
    message,
    description,
    duration: 2,
  });
};
