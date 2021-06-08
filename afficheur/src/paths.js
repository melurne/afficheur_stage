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
            {x: 60, y: 234},
		        {x: 60, y: 210},
		        {x: 245, y: 210},
            {x: 245, y:170}
          ],
    steps: ["Prendre l'ascenceur à gauche", "Descendre au -1", "A droite au fond", "La porte sur la gauche"]
  },
  "Salle des commissions":  {
    etage : -1,
    trace :
          [
            {x: 60, y: 234},
		        {x: 60, y: 210},
		        {x: 250, y: 210}
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
  }
};


export default paths;
