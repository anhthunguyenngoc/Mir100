import ROSLIB from 'roslib';

export class RosPublisher {
  constructor({ rosInstance, topicName, messageType }) {
    this.rosInstance = rosInstance;
    this.topicName = topicName;
    this.messageType = messageType;
    this.topic = null;

    // Initialize the topic when creating the instance
    this.initTopic();
  }

  // Method to initialize the ROS topic
  initTopic() {
    if (this.rosInstance && this.topicName && this.messageType) {
      this.topic = new ROSLIB.Topic({
        ros: this.rosInstance,
        name: this.topicName,
        messageType: this.messageType,
      });
    } else {
      console.error('Invalid ROS instance, topic name or message type');
    }
  }

  // Method to publish a message to the topic
  publish(messageData) {
    if (!this.topic) {
      console.error('Topic is not initialized');
      return;
    }
    const message = new ROSLIB.Message(messageData);
    this.topic.publish(message);
  }

  // Method to unadvertise the topic when done
  unadvertise() {
    if (this.topic) {
      this.topic.unadvertise();
    }
  }
}
