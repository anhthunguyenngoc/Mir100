import ROSLIB from 'roslib';

export class RosService {
  constructor({
    rosInstance,
    serviceName,
    serviceType,
    requestData,
    callback,
  }) {
    if (!rosInstance || !serviceName || !serviceType) {
      console.error('RosService: missing required parameters');
      throw new Error('RosService: missing required parameters');
    }

    this.service = new ROSLIB.Service({
      ros: rosInstance,
      name: serviceName,
      serviceType: serviceType,
    });

    this.request = new ROSLIB.ServiceRequest(requestData || {});
    this.callback = callback;
  }

  setRequestData(data) {
    Object.assign(this.request, data);
  }

  callService() {
    if (!this.service || !this.request) {
      console.error('RosService: Service or Request not properly initialized');
      return;
    }

    this.service.callService(this.request, this.callback);
  }
}
