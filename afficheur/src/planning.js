import React from 'react';
import Axios from 'axios';
import './App.css';

import paths, { mapSalle, Chemin } from './paths.js';

class FloorPlan extends React.Component {
	constructor() {
		super();
		let h = new Date().getHours().toLocaleString(undefined, {minimumIntegerDigits: 2});
		let m = new Date().getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
		let curTime = h + ':' + m;
		this.state = {
			selectedEvent: 0,
			reseting: false,
			curTime: curTime,
			events: [{debut: "", intitule: "", salle: ""}, {debut: "", intitule: "", salle: ""}, {debut: "", intitule: "", salle: ""}],
			cycling: false
		};
		this.cursorUp = this.cursorUp.bind(this);
		this.cursorDown = this.cursorDown.bind(this);
		this.handler = this.handler.bind(this);
		this.tick = this.tick.bind(this);
		this.updateEvents = this.updateEvents.bind(this);
		this.cycler = this.cycler.bind(this);
		this.updateEvents();
		this.cyclingInterval = setInterval(() => {
			this.cycler();
		}, 30000);
		document.addEventListener('keydown', (e) => this.handler(e));
	}

	handler(e) {
		if (this.state.selectedEvent === -1) {
			return;
		}
		else {
			if (e.key === 'ArrowUp') {
				this.cursorUp();
			}
			else if (e.key === 'ArrowDown') {
				this.cursorDown();
			}
			this.setState({reseting: true});
		}
	}

	cycler() {
		if (this.state.selectedEvent === -1) {
			return;
		}
		else {
			if (this.state.selectedEvent === 2 || (this.state.selectedEvent !== 2 && this.state.events[this.state.selectedEvent + 1].intitule === "")) {
				this.setState({selectedEvent: 0});
			}
			else {
				this.setState({selectedEvent: this.state.selectedEvent + 1});
			}
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
		if (this.state.selectedEvent === 2 || this.state.events[this.state.selectedEvent + 1].intitule === "") {
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

	componentDidMount() {
		this.intervalID = setInterval(
			() => {
				this.tick();
				this.updateEvents();
			}
			, 6000
		);
		this.updateEvents();
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
		clearInterval(this.cyclingInterval);
	}

	tick() {
		let h = new Date().getHours().toLocaleString(undefined, {minimumIntegerDigits: 2});
		let m = new Date().getMinutes().toLocaleString(undefined, {minimumIntegerDigits: 2});
		let curTime = h + ':' + m;
		this.setState({curTime: curTime});
	}

	componentDidUpdate() {
		if (this.state.reseting) {
			this.resetAnimation("topPath");
			this.resetAnimation("botPath");
			this.setState({reseting: false});
		}
	}

	updateEvents() {
		Axios.get("http://localhost:3001/events")
			.then(response => {
				//console.log(response);
				var events_ = [];
				for (var rep of response.data) {
					events_ = [...events_, {debut: rep.debut, intitule: rep.intitule, salle: mapSalle(rep.room_id)}];
				}
				while (events_.length < 3) {
					events_ = [...events_, {debut: "", intitule: "", salle: ""}];
				}
				this.setState({events: events_}/*, console.log("data get success", events_)*/)
			})
	}

	render() {
			//console.log(this.state.events);
			console.log(this.state.curTime);
		if (this.state.selectedEvent !== -1 && this.state.events[0].intitule !== ""){
			if (this.state.events[0].fin < this.state.curTime) {
				this.updateEvents();
			}
			var events = this.state.events;
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
								<span className="indicateurEtage">Vous êtes au 1er etage</span>
								<Chemin class={this.state.reseting ? "" : "topPath"}
												points={pathFromAfficheur}
												dotPosition={pathFromAfficheur[0]}/>
							</div>
						</div>

						<div 	className={paths[events[selectedEvent].salle].etage !== 1 ? "bottom plan" : "hidden"}
									id={"floor"+paths[events[selectedEvent].salle].etage.toString()}>
							<div>
								<span className="indicateurEtage">Vous allez au {paths[events[selectedEvent].salle].etage !== -1 ? paths[events[selectedEvent].salle].etage.toString()+"e etage" : "sous-sol"}</span>
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
								{events[0].debut}
							</span>
							<span className={this.state.curTime > events[0].debut ? "res en_cours" : "res"}>
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
								{events[1].debut}
							</span>
							<span className={this.state.curTime > events[1].debut ? "res en_cours" : "res"}>
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
								{events[2].debut}
							</span>
							<span className={this.state.curTime > events[2].debut ? "res en_cours" : "res"}>
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
			//this.setState({selectedEvent: -1});
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

export default FloorPlan;
