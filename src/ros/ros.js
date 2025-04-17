import { useEffect, useState } from 'react';
import ROSLIB from 'roslib';

const RosTopic = (name, messageType, rest) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    let protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    let port = window.location.protocol === 'https:' ? '443' : '9090';
    let ip = '192.168.0.173';

    const ros = new ROSLIB.Ros({
      url: `${protocol}${ip}:${port}`,
    });

    ros.on('connection', () =>
      console.log(`Connected to ROS WebSocket at ${ip}:${port}`)
    );
    ros.on('error', (error) => console.error('ROS Connection Error:', error));
    ros.on('close', () => console.log('Connection to ROS closed.'));

    const listener = new ROSLIB.Topic({
      ros,
      name,
      messageType,
      ...rest,
    });

    listener.subscribe((msg) => {
      console.log(`Received from ${name}:`, msg);
      setMessage(msg);
    });

    return () => {
      listener.unsubscribe();
      ros.close();
    };
  }, [name, messageType]);

  return message;
};

export default RosTopic;
