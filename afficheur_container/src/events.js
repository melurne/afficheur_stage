import React from 'react';

class Events extends React.Component {
	constructor() {
    super();
		this.state = {
			events: []
		};
	}

	componentDidMount() {
		fetch('/events')
			.then(res => res.json())
			.then(events_ => this.setState({events: events_}, console.log("data get success", events_)))
	}

	render() {
    return( <p/>);
	}

}


const events = [
  {
    horaire: "14:00",
    intitule: "Réunion de direction",
    salle: "Salle des commissions"
  },
  {
    horaire: "14:30",
    intitule: "FAQ avec le maire",
    salle: "Salle des conférences"
  },
  {
    horaire: "18:15",
    intitule : "Test 1er etage",
    salle : "Direction générale des services"
  }
]

export default events;
export { Events };
