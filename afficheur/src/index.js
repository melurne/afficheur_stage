import React from 'react';
import ReactDOM from 'react-dom';
import UI from './Icons/ui.js';

import paths from './paths.js';

const SevSegMap = [
	[1, 0, 0, 1, 1, 0, 0, 0],
	[0, 0, 1, 1, 1, 1, 1, 1],
	[0, 0, 0, 1, 1, 0, 0, 0],
	[0, 1, 1, 1, 0, 1, 1, 0],
	[0, 1, 1, 1, 1, 1, 0, 0],
	[0, 1, 0, 1, 1, 0, 0, 1]
];

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
		console.log(this.props.points);
		var path_d = "M" + this.props.points[0].x.toString() + ", " + this.props.points[0].y.toString();
		for (const point of this.props.points.slice(1)) {
			path_d = path_d + "L" + point.x.toString() + ", " + point.y.toString();
		}
		return (
			<svg>
				<path d={path_d} strokeWidth={this.state.thickness} stroke={this.state.color} fill={"none"}/>
				<ellipse id="Ellipse 3" cx={this.state.dotPosition.x} cy={this.state.dotPosition.y} rx={this.state.dotX} ry={this.state.dotY} fill={this.state.color}/>
			</svg>
		);
	}
}

const pathsAsTuple = {
  "Salle de conférence": [
													{x: 10, y: 20},
													{x: 30, y: 50},
													{x: 42, y: 78},
													{x: 90, y: 50}
												]
};

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
			currentFloor: 1,
			targetFloor: 1,
			direction: "none"
		};
		this.floorUp = this.floorUp.bind(this);
		this.floorDown = this.floorDown.bind(this);
	}

	changeFloor = (n) => {
		this.setState({targetFloor: n});
		if (n > this.state.currentFloor) {
			this.setState({direction: "up"});
			while (this.state.currentFloor !== this.state.targetFloor) {
				setTimeout(() => {
					this.floorUp();
				}, TimeBetweenFloors);
			}
		}
		else {
			this.setState({direction: "down"});
			while (this.state.currentFloor !== this.state.targetFloor) {
				setTimeout(() => {
					this.floorDown();
				}, TimeBetweenFloors);
			}
		}
		this.setState({direction: "none"});
	}

	floorUp() {
		this.setState({currentFloor: this.state.currentFloor + 1 > 4 ? 4 : this.state.currentFloor + 1});
	}

	floorDown() {
		this.setState({currentFloor: this.state.currentFloor - 1 < -1 ? -1 : this.state.currentFloor - 1});
	}

	render() {
		return (
			<div>
			<div>
				<Button floorUp = {this.floorUp} text = {"floorUp"}/>
				<Button floorUp = {this.floorDown} text = {"floorDown"}/>
			</div>
			<div style={{textAlign:"center"}}>
				<UI current = {this.state.currentFloor} activation = {SevSegMap[this.state.currentFloor+1]} arrow={this.state.direction}/>
				<Chemin points={pathsAsTuple[this.props.room]} dotPosition={{x: 90, y: 50}} />
			</div>
			</div>
		);
	}
}

ReactDOM.render(<FloorPlan room="Salle de conférence"/>,document.getElementById('root'));
