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
            {x: 106, y: 232},
		        {x: 106, y: 208},
		        {x: 260, y: 208},
            {x: 260, y: 178}
          ],
    steps: ["Prendre l'ascenceur à gauche", "Descendre au -1", "A droite au bout", "La porte sur la gauche"]
  },
  
  "Salle des commissions":  {
    etage : -1,
    trace :
          [
            {x: 106, y: 232},
		        {x: 106, y: 208},
		        {x: 267, y: 208}
          ],
    steps: ["Prendre l'ascenceur à gauche", "Descendre au -1", "A droite au bout", "La porte en face"]
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
            {x: 97, y:248},
            {x: 80, y:248},
            {x: 80,y: 265},
            {x: 130,y: 265},
            {x: 130,y: 245},
            {x: 173,y: 245},
            {x: 173,y: 255}
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
			class: this.props.class,
      initialHeight: 300,
      actualHeight: 300
		};
	}

  componentDidMount() {
    let elem = document.getElementById("top");
    if (elem === null) {
      elem = document.getElementById("noChange");
    }
    if (elem === null) {
      return;
    }
    let h = elem.clientHeight;
    if (h !== this.state.actualHeight){
       this.setState({actualHeight: h}); 
    }
  }

  componentDidUpdate() {
    let elem = document.getElementById("top");
    if (elem === null) {
      elem = document.getElementById("noChange");
    }
    if (elem === null) {
      return;
    }
    let h = elem.clientHeight;
    if (h !== this.state.actualHeight){
       this.setState({actualHeight: h}); 
    }
  }

	render() {
    //console.log(this.state.actualHeight)
    var path = [];
    const factor = this.state.actualHeight / this.state.initialHeight;
    for (const point of this.props.points) {
      path = [...path, {x: point.x * factor, y: point.y * factor}]
    }

		var path_d = "M" + path[0].x.toString() + " " + path[0].y.toString();
		for (const point of path.slice(1)) {
			path_d = path_d + "L" + point.x.toString() + " " + point.y.toString();
		}
		return (
			<svg className="chemin" width="100%" height="100%">
				<path className={this.state.class} id={this.state.class} d={path_d} strokeWidth={this.state.thickness} stroke={this.state.color} fill={"none"}/>
				<ellipse id="EndPoint" cx={this.state.dotPosition.x * factor} cy={this.state.dotPosition.y * factor} rx={this.state.dotX} ry={this.state.dotY} fill={this.state.color}/>
			</svg>
		);
	}
}


export default paths;
export { mapSalle, Chemin };
