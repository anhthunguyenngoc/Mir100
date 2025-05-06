import { RosPublisher } from '../../ros';

export class JoystickControl {
  constructor({ rosInstance, joystickToken }) {
    this.rosInstance = rosInstance;
    this.joystickToken = joystickToken;

    this.publishJoystickVel = new RosPublisher({
      rosInstance: this.rosInstance,
      topicName: '/joystick_vel',
      messageType: 'mirMsgs/JoystickVel',
    });
  }

  sendMovementCommand(linearX, angularZ) {
    if (!this.joystickToken) {
      console.error('No joystick token available!');
      return;
    }

    // Giả sử bạn sẽ thực hiện lệnh gửi đến ROS
    this.publishJoystickVel.publish({
      joystick_token: this.joystickToken,
      speed_command: {
        linear: { x: linearX, y: 0, z: 0 },
        angular: { x: 0, y: 0, z: angularZ },
      },
    });
  }

  moveForward({ linearSpeed }) {
    this.sendMovementCommand(linearSpeed, 0);
  }

  moveBackward({ linearSpeed }) {
    this.sendMovementCommand(-linearSpeed, 0);
  }

  moveLeft({ angularSpeed }) {
    this.sendMovementCommand(0, angularSpeed);
  }

  moveRight({ angularSpeed }) {
    this.sendMovementCommand(0, -angularSpeed);
  }

  moveForwardLeft({ linearSpeed, angularSpeed }) {
    this.sendMovementCommand(linearSpeed, angularSpeed);
  }

  moveForwardRight({ linearSpeed, angularSpeed }) {
    this.sendMovementCommand(linearSpeed, -angularSpeed);
  }

  moveBackwardLeft({ linearSpeed, angularSpeed }) {
    this.sendMovementCommand(-linearSpeed, angularSpeed);
  }

  moveBackwardRight({ linearSpeed, angularSpeed }) {
    this.sendMovementCommand(-linearSpeed, -angularSpeed);
  }

  emergencyStop() {
    this.sendMovementCommand(0, 0);
  }
}
