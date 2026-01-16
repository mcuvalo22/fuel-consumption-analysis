# Fuel Consumption Analysis Project

Fleet fuel consumption analysis using custom implementations of `map`, `reduce`, and `pipe` functions.

## Project Description

Fuel Consumption Analysis is a Node.js project developed as part of the **Declarative Programming** course (*Deklarativno programiranje*) at the **Faculty of Organization and Informatics (FOI)**, **University of Zagreb**.  
The project was created in an academic context to demonstrate an understanding of declarative programming principles, with a strong emphasis on functional programming concepts such as immutability, pure functions, and function composition.

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

## Instalation
```bash
npm install
```

## Data format

1. Add CSV data to data/fuel_data.csv
2. Data format:
```bash
   vehicle_id,date,distance_km,fuel_used_liters,fuel_price_per_liter
```

## Running the app

```bash
npm start
```

## Technologies

- Node.js
- Functional Programming

## Author

Mateo Čuvalo