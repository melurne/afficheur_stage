import React from 'react'

const pathsAsTuple = {
  "Salle de conférence": [(10, 20), (30, 50), (42, 78), (90, 50)]
};

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

const generatePointarray = (listOfTuples) => {
	var pointsList = [];
	var tuple;
	for (tuple in listOfTuples) {
		pointsList = [...pointsList, new Point(tuple[0], tuple[1])];
	}
	return pointsList;
}

const Points = {
  "Salle de conférence": generatePointarray(pathsAsTuple["Salle de conférence"])
};



export default Points;
