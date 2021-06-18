import React from 'react';

const paths = {
  "ascenceur" :
        [
          {x: 157, y: 265},
          {x: 130, y: 265},
          {x: 130, y: 210},
          {x: 60, y: 210},
          {x: 60, y: 234}
        ],

  "Salle des conférences":  {
    etage : -1,
    trace :
          [
            {x: 60, y: 236},
		        {x: 60, y: 210},
		        {x: 245, y: 210},
            {x: 245, y:167}
          ],
    steps: ["Prendre l'ascenceur à gauche", "Descendre au -1", "A droite au fond", "La porte sur la gauche"]
  },
  "Salle des commissions":  {
    etage : -1,
    trace :
          [
            {x: 60, y: 236},
		        {x: 60, y: 210},
		        {x: 255, y: 210}
          ],
    steps: ["Prendre l'ascenceur à gauche", "Descendre au -1", "A droite au fond", "La porte en face"]
  },
  "Salle du conseil municipal": {
    etage : 2,
    trace :
          [
            {x: 20, y:45},
            {x: 20, y:45}
          ],
    steps: ["Prendre l'ascenceur à gauche", "Monter au 2e", "Tout de suite en face", ""]
  },

  "Direction générale des services" : {
    etage : 1,
    trace :
          [
            {x: 157, y: 265},
            {x: 130, y: 265},
            {x: 130, y: 210},
            {x: 10, y: 210}
          ],
    steps : ["Prendre à gauche", "Tout de suite en face", "", ""]
  },

  "Direction des services informatiques" : {
    etage : 4,
    trace :
          [
            {x: 44, y:250},
            {x: 30, y:250},
            {x: 30,y: 275},
            {x: 90,y: 275},
            {x: 90,y: 255},
            {x: 145,y: 255},
            {x: 145,y: 260}
          ],
    steps : ["Prendre l'ascenceur à gauche", "Monter au 4e", "Dans le couloir à gauche", "3e porte à droite"]
  },

  "Bureau des adjoints" : {
    etage : 1,
    trace :
          [
            {x: 157, y: 265},
            {x: 190, y: 265},
            {x: 190, y: 210},
            {x: 290, y: 210}
          ],
    steps : ["Prendre à droite", "Tout de suite en face", "", ""]
  }
};

const mapSalle = (n) => {
  const salles = ["",
                  "Salle des commissions",
                  "Salle des conférences",
                  "Direction générale des services",
                  "Direction des services informatiques",
                  "Bureau des adjoints"
                ];
  return salles[n];
};

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


export default paths;
export { mapSalle, Chemin };
