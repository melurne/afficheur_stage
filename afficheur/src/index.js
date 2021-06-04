import React from 'react';
import ReactDOM from 'react-dom';
import UI from './Icons/uiv2.js';
import './App.css';

import paths from './paths.js';
import events from './events.js'

const TimeBetweenFloors = 500; //ms

class Chemin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			begin: this.props.begin,
			end: this.props.end,
			dotPosition: this.props.dotPosition,
			dotX: "6.5",
			dotY: "4.5",
			thickness: 3,
			color: "#2400FF"
		};
	}
	render() {
		var path_d = "M" + this.props.points[0].x.toString() + ", " + this.props.points[0].y.toString();
		for (const point of this.props.points.slice(1)) {
			path_d = path_d + "L" + point.x.toString() + ", " + point.y.toString();
		}
		return (
			<svg>
				<path d={path_d} strokeWidth={this.state.thickness} stroke={this.state.color} fill={"none"}/>
				<ellipse id="EndPoint" cx={this.state.dotPosition.x} cy={this.state.dotPosition.y} rx={this.state.dotX} ry={this.state.dotY} fill={this.state.color}/>
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
	}
	
	render() {
		return (
			<div class="viewbox">
			{/*<div>
				<Button floorUp = {this.floorUp} text = {"floorUp"}/>
				50<Button floorUp = {this.floorDown} text = {"floorDown"}/>
			</div>*/}
			<div style={{textAlign: "center"}}>
				<UI />
				<Chemin points={paths[this.props.events[this.state.selectedEvent].salle].trace} dotPosition={{x: 90, y: 50}} />
			</div>
			<div class={paths[this.props.events[this.state.selectedEvent].salle].steps[0] !== "" ? "step" : "hidden"} id="step1">
				<p>{paths[this.props.events[this.state.selectedEvent].salle].steps[0]}</p>
			</div>
			<div class={paths[this.props.events[this.state.selectedEvent].salle].steps[1] !== "" ? "step" : "hidden"} id="step2">
				<p>{paths[this.props.events[this.state.selectedEvent].salle].steps[1]}</p>
			</div>
			<div class={paths[this.props.events[this.state.selectedEvent].salle].steps[2] !== "" ? "step" : "hidden"} id="step3">
				<p>{paths[this.props.events[this.state.selectedEvent].salle].steps[2]}</p>
			</div>
			<div class={paths[this.props.events[this.state.selectedEvent].salle].steps[3] !== "" ? "step" : "hidden"} id="step4">
				<p>{paths[this.props.events[this.state.selectedEvent].salle].steps[3]}</p>
			</div>

			<div class={this.props.events[0].intitule !== "" ? "event" : "hidden"} id="event1">
				<div class="horaire">
					<p>{this.props.events[0].horaire}</p>
				</div>
				<div class="intitule">
					<p>{this.props.events[0].intitule}</p>
				</div>
				<div class="salle">
					<p>{this.props.events[0].salle}</p>
				</div>
			</div>

			<div class={this.props.events[1].intitule !== "" ? "event" : "hidden"} id="event2">
				<div class="horaire">
					<p>{this.props.events[1].horaire}</p>
				</div>
				<div class="intitule">
					<p>{this.props.events[1].intitule}</p>
				</div>
				<div class="salle">
					<p>{this.props.events[1].salle}</p>
				</div>
			</div>

			<div class={this.props.events[2].intitule !== "" ? "event" : "hidden"} id="event3">
				<div class="horaire">
					<p>{this.props.events[2].horaire}</p>
				</div>
				<div class="intitule">
					<p>{this.props.events[2].intitule}</p>
				</div>
				<div class="salle">
					<p>{this.props.events[2].salle}</p>
				</div>
			</div>

			</div>
		);
	}
}

ReactDOM.render(<FloorPlan events={events} room="Salle de conférence"/>,document.getElementById('root'));
