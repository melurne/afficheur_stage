const paths = {
  "ascenceur" :
        [
          {x: 157, y: 265},
          {x: 130, y: 265},
          {x: 130, y: 210},
          {x: 60, y: 210},
          {x: 60, y: 234}
        ],

  "Salle de conférence":  {
    etage : -1,
    trace :
          [
            {x: 60, y: 234},
		        {x: 130, y: 265},
		        {x: 130, y: 210},
		        {x: 60, y: 210},

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
  }
};


export default paths;
