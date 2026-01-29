# Fuel Consumption Analysis Project

Project for the **Declarative Programming** course – Faculty of Electrical Engineering and Computing, University of Zagreb.

## About the project

This project demonstrates the practical application of **functional programming** through custom implementations of higher-order functions (`map`, `reduce`, `pipe`) and their use in analyzing fleet fuel consumption data.

## Features

- Custom functional programming implementations (`map`, `reduce`, `pipe`)
- CSV data parsing
- Fuel consumption calculation
- Statistics per vehicle
- Identification of high-consumption and fuel-efficient vehicles
- Total fuel cost analysis

## Core Functions Overview

### `map`
The `map` function is used for data transformation by applying a given function to each element of a collection, producing a new collection of the same size. This approach preserves immutability and enables a declarative style of programming where data transformations are expressed without explicit loops or side effects.

### `reduce`
The `reduce` function performs data aggregation by iteratively combining elements of a collection into a single accumulated value. It provides a formal mechanism for expressing operations such as summation, grouping, and counting, which are essential for analytical tasks in functional and declarative programming.

### `pipe`
The `pipe` function enables function composition by connecting multiple functions into a linear processing pipeline. The output of one function becomes the input of the next, resulting in clear, readable, and modular data-processing flows rooted in mathematical function composition.

## Installation and Usage

### CLI Version (Node.js)
```bash
1. Clone the repository
git clone https://github.com/mcuvalo22/fuel-consumption-analysis.git
cd fuel-consumption-analysis

2. Add data
Place the CSV file in data/fuel_data.csv

3. Run the analysis
npm start
```
### Web Version (React)
```bash
cd client
npm install
npm run dev
```

## Technologies

### Backend (Core)
- **Node.js** (ES6 Modules)
- **Vanilla JavaScript** – no external libraries for core functionality

### Frontend (Web Interface)
- **React 18**
- **Vite** – build tool
- **Chart.js** – data visualization

## Author

Mateo Čuvalo
Student, Faculty of organization and informatics Varaždin
University of Zagreb

## License

This project is licensed under the GPL License – see the LICENSE file for details.

## References

Detailed references and academic sources will be provided in the project documentation (LaTeX).
