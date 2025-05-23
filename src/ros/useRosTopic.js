import { useEffect, useState } from 'react';
import ROSLIB from 'roslib';

export function useRosTopic({ rosInstance, name, messageType, rest = {} }) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!rosInstance || !name || !messageType) return;

    const listener = new ROSLIB.Topic({
      ros: rosInstance,
      name,
      messageType,
      throttle_rate: 3000,
      ...rest,
    });

    listener.subscribe((msg) => {
      // console.log(`📨 Received from topic ${name}:`, msg);
      setMessage(msg);
    });

    return () => {
      listener.unsubscribe();
    };
  }, [rosInstance, name, messageType]);

  return message;
}
