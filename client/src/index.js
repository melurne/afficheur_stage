import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Axios from 'axios';

//import addrs from '../addrs.js';

const server = "http://173.42.0.5:3001/";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.function = () => {
      this.props.function(parseInt(this.props.id));
      setTimeout(() => {
        console.log("reset");
        this.props.function(-1);
      }, 15000);
    }
  }

  render() {
    return(
      <input className="button" id={this.props.id} type="button" value={this.props.value} onClick={this.function} />
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
  }

  changeDisplay(room) {
    let payload = {room_id: room};
    console.log(payload);
    Axios.post(server + "api/request/", payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => console.log(res))
      .catch(err => console.log(err));

  }

  componentDidMount() {
    this.changeDisplay(1);
  }

  render() {
    return (
      <div id="buttonsList">
        <div className="buttonRow">
          <Button id="1" function={this.changeDisplay} value="Salle des commissions" />
          <Button id="2" function={this.changeDisplay} value="Salle des conférences"/>
          <Button id="-1" function={this.changeDisplay} value="Affichage idle"/>
          <Button id="3" function={this.changeDisplay} value="DGS" />
          <Button id="4" function={this.changeDisplay} value="DSI" />
          <Button id="5" function={this.changeDisplay} value="Bureau des adjoints" />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Selector />, document.getElementById('root'));
