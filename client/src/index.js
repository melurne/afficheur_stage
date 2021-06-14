import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Axios from 'axios';
const qs = require('qs');

class Button extends React.Component {
  render() {
    return(
      <input id={this.props.id} type="button" value={this.props.id} onClick={this.props.function} />
    );
  }
}

class Selector extends React.Component {
  constructor() {
      super();
      this.state = {
        currentlyShowing: -1
      }
      this.changeDisplay = this.changeDisplay.bind(this);
      this.changeTo1 = this.changeTo1.bind(this);
      this.changeTo2 = this.changeTo2.bind(this);
      this.changeTom1 = this.changeTom1.bind(this);
  }

  changeDisplay(room) {
    let payload = {room_id: room};
    console.log(payload);
    Axios.post("http://localhost:3001/api/request", payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.changeDisplay(1);
  }

  changeTo1() {
    this.changeDisplay(1);
  }
  changeTo2() {
    this.changeDisplay(2);
  }
  changeTom1() {
    this.changeDisplay(-1);
  }

  render() {
    return (
      <div>
        <Button id="1" function={this.changeTo1} />
        <Button id="2" function={this.changeTo2} />
        <Button id="-1" function={this.changeTom1} />

      </div>
    );
  }
}

ReactDOM.render(<Selector />, document.getElementById('root'));
