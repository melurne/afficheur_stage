import React from 'react';
import './App.css';
import paths, { Chemin } from './paths.js';

class Directions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: this.props.target
    };
  }

  render() {
    var target = this.state.target;
    var steps = paths[target].steps;
    var pathFromAfficheur = paths[target].etage !== 1 ? paths["ascenceur"] : paths[target].trace;
    var pathToSalle = paths[target].trace;

    return (
      <div className="reacted">
        <div id="directions">
          <span><b> Vous avez demandé : </b></span>
          <span><b> {target} </b></span>
        </div>

				<div className="affichageChemin">
					<div className="plans">
						<div 	className="etageAfficheur plan"
									id={paths[target].etage === 1 ? "noChange" : "top"}>
							<div>
								<span className="indicateurEtage">Vous êtes au 1er etage</span>
								<Chemin class="topPath"
												points={pathFromAfficheur}
												dotPosition={pathFromAfficheur[0]}/>
							</div>
						</div>

						<div 	className={paths[target].etage !== 1 ? "bottom plan" : "hidden"}
									id={"floor"+paths[target].etage.toString()}>
							<div>
								<span className="indicateurEtage">Vous allez au {paths[target].etage !== -1 ? paths[target].etage.toString()+"e etage" : "sous-sol"}</span>
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
      </div>

    );
  }
}



export default Directions;
