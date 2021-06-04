const paths = {
  "Salle de conférence":  {
    etage : -1,
    trace :
          [
            {x: 10, y: 20},
		        {x: 30, y: 50},
		        {x: 42, y: 78},
		        {x: 90, y: 50}
          ],
    steps: ["Prendre l'ascenceur à gauche", "Descendre au -1", "A gauche au fond", "La porte sur la gauche"]
  },
  "Salle du conseil municipal": {
    etage : 2,
    trace :
          [
            {x: 20, y:45},
            {x: 20, y:45}
          ],
    steps: ["Prendre l'ascenceur à gauche", "Monter au 2e", "Tout de suite en face", ""]
  }
};


export default paths;
