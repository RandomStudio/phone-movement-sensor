import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import * as io from 'socket.io-client';

const socket = io('http://192.168.1.78:5555');

class App extends Component {

  constructor(props) {
    super(props);
    this.deviceMotionHandler = this.deviceMotionHandler.bind(this);
  }

  deviceMotionHandler(event) {
    // console.log(event);
    const motion = {
      acceleration: {
        x: event.acceleration.x,
        y: event.acceleration.y
      },
      rotation: {
        alpha: event.rotationRate.alpha,
        beta: event.rotationRate.beta,
        gama: event.rotationRate.gamma
      },
      time: Date.now()
    }
    // console.log(motion);

    socket.emit('motionIn', motion);

    this.setState({ lastMotionEvent: motion });
  }
  

  componentDidMount() {

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', this.deviceMotionHandler);
    }

    socket.on('connect', () => {
      this.setState({ serverConnected: true });
    });

  }

  render() {
    return (
      <div className="App">
        {this.state && this.state.lastMotionEvent &&
          <code>{JSON.stringify(this.state.lastMotionEvent, null, 4)}</code>
        }
      </div>
    );
  }
}

export default App;
