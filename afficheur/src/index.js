import React from 'react';
import ReactDOM from 'react-dom';
//import UI from './Icons/uiv2.js';
import './App.css';
import logo from './SVGs/logo.svg';

import paths from './paths.js';
import events from './events.js'

class Chemin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dotPosition: this.props.dotPosition || this.props.points[0],
			dotX: "4",
			dotY: "4",
			thickness: 3,
			color: "#2400FF"
		};
	}
	render() {
		var path_d = "M" + this.props.points[0].x.toString() + " " + this.props.points[0].y.toString();
		for (const point of this.props.points.slice(1)) {
			path_d = path_d + "L" + point.x.toString() + " " + point.y.toString();
		}
		return (
			<svg width="300" height="300">
			<g transform="scale(100%, 100%)">
				<path d={path_d} strokeWidth={this.state.thickness} stroke={this.state.color} fill={"none"}/>
				<ellipse id="EndPoint" cx={this.state.dotPosition.x} cy={this.state.dotPosition.y} rx={this.state.dotX} ry={this.state.dotY} fill={this.state.color}/>
			</g>
			</svg>
		);
	}
}

class Button extends React.Component {
	render() {
		return (
			<button onClick={this.props.floorUp}>
				{this.props.text}
			</button>
		);
	}
}

class FloorPlan extends React.Component {
	constructor() {
		super();
		this.state = {
			selectedEvent: 0
		};
		this.cursorUp = this.cursorUp.bind(this);
		this.cursorDown = this.cursorDown.bind(this);
		this.handler = this.handler.bind(this);
		document.addEventListener('keydown', (e) => this.handler(e));
	}

	handler(e) {
		if (e.key === 'ArrowUp') {
			this.cursorUp();
		}
		else if (e.key === 'ArrowDown') {
			this.cursorDown();
		}
	}

	cursorUp() {
		if (this.state.selectedEvent === 0 || this.state.selectedEvent === -1) {
			return;
		}
		else {
			this.setState({selectedEvent: this.state.selectedEvent - 1});
		}
	}

	cursorDown() {
		if (this.state.selectedEvent === 2 || events[this.state.selectedEvent + 1].intitule === "") {
			return;
		}
		else {
			this.setState({selectedEvent: this.state.selectedEvent + 1});
		}
	}

	render() {
		if (this.state.selectedEvent !== -1 && events[0].intitule !== ""){
			var selectedEvent = this.state.selectedEvent;
			var steps = paths[events[selectedEvent].salle].steps;
			var pathFromAfficheur = paths[events[selectedEvent].salle].etage !== 1 ? paths["ascenceur"] : paths[events[selectedEvent].salle].trace;
			var pathToSalle = paths[events[selectedEvent].salle].trace;

			return (
			<div className="reacted">

			<div className="affichageChemin">
			<div className="plans">
			<div className="etageAfficheur plan" id={paths[events[selectedEvent].salle].etage === 1 ? "noChange" : "top"}>
				<div>
					<Chemin points={pathFromAfficheur} dotPosition={pathFromAfficheur[0]}/>
				</div>
			</div>

			<div className={paths[events[selectedEvent].salle].etage !== 1 ? "bottom plan" : "hidden"} id={"floor"+paths[events[selectedEvent].salle].etage.toString()}>
				<div>
					<Chemin points={pathToSalle} dotPosition={pathToSalle[pathToSalle.length-1]} />
				</div>
			</div>
			</div>

			<div className="steps">
			<div className={steps[0] !== "" ? "step" : "hidden"} id="step1">
				<p>{steps[0]}</p>
			</div>
			<div className={steps[1] !== "" ? "step" : "hidden"} id="step2">
				<p>{steps[1]}</p>
			</div>
			<div className={steps[2] !== "" ? "step" : "hidden"} id="step3">
				<p>{steps[2]}</p>
			</div>
			<div className={steps[3] !== "" ? "step" : "hidden"} id="step4">
				<p>{steps[3]}</p>
			</div>
			</div>
			</div>


			<div className="events">
			<div className="partres1"> <center>
				<div className={selectedEvent === 0 ? "divres isSelected" : "divres"}> <span className="hres"> {events[0].horaire} </span> <span className="res"> {events[0].intitule} </span> <span className="sres"> {events[0].salle} </span></div>
			</center></div>

			<div className="partres2"> <center>
				<div className={selectedEvent === 1 ? "divres isSelected" : "divres"}> <span className="hres"> {events[1].horaire} </span> <span className="res"> {events[1].intitule} </span> <span className="sres"> {events[1].salle} </span></div>
			</center></div>

			<div className="partres3"><center>
				<div className={selectedEvent === 2 ? "divres isSelected" : "divres"}> <span className="hres"> {events[2].horaire} </span> <span className="res"> {events[2].intitule} </span> <span className="sres"> {events[2].salle} </span></div>
			</center></div>
			</div>

			</div>
		);
	}
	else {
		if (this.state.selectedEvent !== -1) {
			this.setState({selectedEvent: -1});
		}
		return (
			<div>
				Il n'y a aucune réunion de prévue
			</div>
		);
	}
}
}

ReactDOM.render(<FloorPlan />,document.getElementById('root'));

//serveur-intra/extensions_joomla/Affichage_dynamique_Commissions
