import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import './App.css';

import Directions from './directions.js';
import FloorPlan from './planning.js';
import { mapSalle } from './paths.js'

class Display extends React.Component {
	constructor() {
		super();
		this.state = {
			displayMode: 'idle',
			destination: ''
		};
	}

	getRequest() {
		Axios.get("http://localhost:3001/request")
			.then(response => {
				const room_id = response.data.room_id;
				if (room_id === -1) {
					this.setState({displayMode: 'idle', destination: ''});
				}
				else {
					this.setState({displayMode: 'destination', destination: mapSalle(room_id)});
				}
			});
	}

	componentDidMount() {
		this.intervalID = setInterval(
			() => {
				console.log("tick");
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
//ReactDOM.render(<Directions target="Salle des conférences"/>,document.getElementById('root'));

//serveur-intra/extensions_joomla/Affichage_dynamique_Commissions
