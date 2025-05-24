import { useEffect, useState } from 'react';
import ROSLIB from 'roslib';

let globalRos = null;

export function useRosConnection() {
  const [rosInstance, setRosInstance] = useState(null);

  useEffect(() => {
    if (globalRos) {
      setRosInstance(globalRos);
      return;
    }

    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const port = window.location.protocol === 'https:' ? '443' : '9090';
    const ip = '172.20.10.2';

    const ros = new ROSLIB.Ros({
      url: `${protocol}${ip}:${port}`,
    });

    ros.on('connection', () => console.log('✅ Connected to ROS'));
    ros.on('error', (error) =>
      console.error('❌ ROS Connection Error:', error)
    );
    ros.on('close', () => console.log('🔌 ROS Connection Closed'));

    globalRos = ros;
    setRosInstance(ros);

    return () => {
      ros.close();
      globalRos = null;
    };
  }, []);

  return rosInstance;
}
