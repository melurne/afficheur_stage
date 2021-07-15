import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import './App.css';

import Directions from './directions.js';
import FloorPlan from './planning.js';
import { mapSalle } from './paths.js';

const server = "http://173.42.0.5:3001/";

class Display extends React.Component {
	constructor() {
		super();
		this.state = {
			displayMode: 'idle',
			destination: ''
		};
	}

	getRequest() {
		Axios.get(server + "request/")
			.then(response => {
				const room_id = response.data.room_id;
				if (room_id === -1) {
					if (this.state.displayMode !== 'idle') {
						this.setState({displayMode: 'idle', destination: ''});
					}
				}
				else {
					this.setState({displayMode: 'destination', destination: mapSalle(room_id)});
				}
			});
	}

	componentDidMount() {
		this.intervalID = setInterval(
			() => {
				//console.log("tick");
				this.getRequest();
			}
			, 1000
		);
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	render() {
		if (this.state.displayMode === 'idle') {
			return(<FloorPlan />);
		}
		else {
			return(<Directions target={this.state.destination} />);
		}

	}

}

ReactDOM.render(<Display />,document.getElementById('root'));
