import React from 'react';
import ReactDOM from 'react-dom';
//import UI from './Icons/uiv2.js';
import './App.css';

import paths from './paths.js';
import events from './events.js'

class Chemin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dotPosition: this.props.dotPosition || {x: -10, y: -10},
			dotX: "4",
			dotY: "4",
			thickness: 3,
			color: "#2400FF",
			class: this.props.class
		};
	}

	render() {
		var path_d = "M" + this.props.points[0].x.toString() + " " + this.props.points[0].y.toString();
		for (const point of this.props.points.slice(1)) {
			path_d = path_d + "L" + point.x.toString() + " " + point.y.toString();
		}
		return (
			<svg className="chemin" width="300" height="300">
				<path className={this.state.class} id={this.state.class} d={path_d} strokeWidth={this.state.thickness} stroke={this.state.color} fill={"none"}/>
				<ellipse id="EndPoint" cx={this.state.dotPosition.x} cy={this.state.dotPosition.y} rx={this.state.dotX} ry={this.state.dotY} fill={this.state.color}/>
			</svg>
		);
	}
}

class FloorPlan extends React.Component {
	constructor() {
		super();
		var today = new Date();
		this.state = {
			selectedEvent: 0,
			reseting: false,
			curTime: today.getHours() + ":" + today.getMinutes()
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
		this.setState({reseting: true});
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

	resetAnimation(id) {
		var element = document.getElementById(id);
		element.classList.remove(id);
		void element.offsetWidth;
		setTimeout(() => {
			element.classList.add(id);
		}, 10);
	}

	componenetWillMount() {
		setInterval(function(){
			const today = new Date();
			this.setState({curTime: today.getHours() + ':' + today.getMinutes()});
		}.bind(this), 60000);
	}

	componentDidUpdate() {
		if (this.state.reseting) {
			this.resetAnimation("topPath");
			this.resetAnimation("botPath");
			this.setState({reseting: false});
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
						<div 	className="etageAfficheur plan"
									id={paths[events[selectedEvent].salle].etage === 1 ? "noChange" : "top"}>
							<div>
								<Chemin class={this.state.reseting ? "" : "topPath"}
												points={pathFromAfficheur}
												dotPosition={pathFromAfficheur[0]}/>
							</div>
						</div>

						<div 	className={paths[events[selectedEvent].salle].etage !== 1 ? "bottom plan" : "hidden"}
									id={"floor"+paths[events[selectedEvent].salle].etage.toString()}>
							<div>
								<Chemin class={this.state.reseting ? "" : "botPath"}
												points={pathToSalle} />
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
					<div className={events[0].intitule === "" ? "hidden" : "partres1"}> <center>
						<div className={selectedEvent === 0 ? "divres isSelected" : "divres"}>
							<span className="hres">
								{events[0].horaire}
							</span>
							<span className={this.state.curTime > events[0].horaire ? "res en_cours" : "res"}>
								{events[0].intitule}
							</span>
							<span className="sres">
								{events[0].salle}
							</span>
						</div>
					</center></div>

					<div className={events[1].intitule === "" ? "hidden" : "partres2"}> <center>
						<div className={selectedEvent === 1 ? "divres isSelected" : "divres"}>
							<span className="hres">
								{events[1].horaire}
							</span>
							<span className={this.state.curTime > events[1].horaire ? "res en_cours" : "res"}>
								{events[1].intitule}
							</span>
							<span className="sres">
								{events[1].salle}
							</span>
						</div>
					</center></div>

					<div className={events[2].intitule === "" ? "hidden" : "partres3"}><center>
						<div className={selectedEvent === 2 ? "divres isSelected" : "divres"}>
							<span className="hres">
								{events[2].horaire}
							</span>
							<span className={this.state.curTime > events[2].horaire ? "res en_cours" : "res"}>
								{events[2].intitule}
							</span>
							<span className="sres">
								{events[2].salle}
							</span>
						</div>
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
			<div className="reacted">
				<div className="centeredWraper">
					<span id="noEvent">Il n'y a plus aucune réunion prévue aujourd'hui</span>
				</div>
			</div>
		);
	}
}
}

ReactDOM.render(<FloorPlan />,document.getElementById('root'));

//serveur-intra/extensions_joomla/Affichage_dynamique_Commissions
