# Vehicle Transaction Data Dashboard

This project is a web application that displays vehicle data collected from a remote REST API. The application presents this data in a user-friendly dashboard that includes a table, doughnut chart, and scatter chart data visualizations, each equipped with informative tooltips.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Design Considerations](#design-considerations)
- [API Integration](#api-integration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Deployment](#deployment)
- [License](#license)

## Features

- **User Authentication:** Secure login and logout.
- **Data Visualization:** Charts (doughnut, scatter) to visualize vehicle data with tooltips showing detailed information including vehicle percentages.
- **Responsive Design:** Adapts to different screen sizes.
- **Dynamic Data Fetching:** Periodically fetches updated data from the REST API.
- **Date and Totals Display:** Displays the date of the transactions and the total number of vehicles next to the transaction header.
- **Logout Confirmation:** Modal confirmation upon logout.
- **Accessible Design:** Ensures accessibility in color choices and design elements.

## Installation

To set up this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/repository-name.git


### 2. Install Dependencies

Ensure you have Node.js installed, then run:
```npm install```

### 3. Set Up Environment Variables

Create a .env file in the root directory and add any necessary environment variables:

``` NEXT_PUBLIC_API_URL= (get from Engineer) ```
`` `NEXT_PUBLIC_LOGIN_ENDPOINT=/api/login ```

## Usage

### Running the Application Locally

To start the development server, run
``` npm run dev ```

The application will be available at <http://localhost:3000>.

## Technologies Used

- Frontend: React, TypeScript, Next.js
- Styling: Tailwind CSS
- Data Visualization: Chart.js, React-Chartjs-2
- State Management: React Hooks, Context API
- Authentication: Custom authentication flow using the useAuth context
- Date Manipulation: Moment.js

## Design Considerations 
- Responsive Design: Tailwind CSS is used to ensure the application is responsive across various devices.
- Tooltip Design: Tooltips provide detailed information including both vehicle count and percentage.
- Legend and Row Colors: Consistent color theming using Tailwind CSS for legends and table rows, with opacity adjustments.
- User Experience: Includes confirmation modals and error handling to enhance user experience.- ce: Includes confirmation modals and error handling to enhance user experience.

## API Integration

### Fetching Data

The application fetches vehicle data from the remote REST API periodically and displays it in a dashboard. The data includes:

- Timestamp: Time when the record was created.
- Classification: Type of vehicle (Truck, Car, Bike, etc.).
- Axles: Number of axles on the vehicle.
- Height: Height of the vehicle in inches.

The application fetches data from the following endpoint:
[*Please ask a Backend Engineer for endpoint*]

The data is returned in JSON format and includes fields like timestamp, classification, axles, and height.

### Doughnut Chart

The doughnut chart visualizes the distribution of vehicle classifications, providing a clear breakdown of the different types of vehicles recorded.

### Scatter Chart

The scatter chart visualizes vehicle axles against their height, providing insight into the distribution of vehicle types based on their physical dimensions.


### Sample API Response

```json
[
 {
 "timestamp": "2024-08-19T18:18:53Z",
 "classification": "car",
 "axles": 2,
 "height": 58
 },
 {
 "timestamp": "2024-08-19T18:18:53Z",
 "classification": "truck",
 "axles": 6,
 "height": 152
 },
 {
 "timestamp": "2024-08-19T18:18:53Z",
 "classification": "bike",
 "axles": 2,
 "height": 42
 }
]
```

### Running the Application

To run the application locally:
```npm run dev```

## Testing

### Unit Tests

Basic unit tests can be added using Jest or React Testing Library.

### Running Tests

```npm test```

### Test Coverage

The current test coverage for the project is as follows:

File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s  
------------------------|---------|----------|---------|---------|--------------------
All files               |    57.3 |    42.85 |      50 |   56.32 |                    
 src                    |     100 |      100 |     100 |     100 |                    
  types.ts              |     100 |      100 |     100 |     100 |                    
 src/api                |    92.3 |       80 |     100 |   91.66 | 8                  
 src/app                |       0 |        0 |       0 |       0 |                    
  layout.tsx            |       0 |      100 |       0 |       0 | 1-20               
  page.tsx              |       0 |        0 |       0 |       0 | 3-27               
 src/app/dashboard      |       0 |        0 |       0 |       0 |                    
  page.tsx              |       0 |        0 |       0 |       0 | 3-187              
 src/components         |   88.04 |    85.71 |      90 |    87.5 |                    
  AuthForm.tsx          |   87.09 |       60 |     100 |   86.66 | 20-21,29,34        
  ChartLegend.tsx       |     100 |      100 |     100 |     100 |                    
  Charts.tsx            |      75 |      100 |   66.66 |   73.07 | 84-86,147-150      
  ConfirmationModal.tsx |     100 |      100 |     100 |     100 |                    
  NavBar.tsx            |     100 |      100 |     100 |     100 |                    
 src/context            |      50 |        0 |      25 |   44.44 |                    
  AuthContext.tsx       |      50 |        0 |      25 |   44.44 | 20-24,29-30,41-45  
 src/utils              |   67.79 |        0 |   45.83 |   65.45 |                    
  colors.ts             |     100 |      100 |     100 |     100 |                    
  dataUtils.ts          |   58.69 |        0 |   45.83 |   54.76 | 10-13,20-21,36-101 
  mockVehicleData.ts    |     100 |      100 |     100 |     100 |                    
------------------------|---------|----------|---------|---------|--------------------

## Lighthouse Performance Results

The application was tested using Google's Lighthouse tool. Below are the performance scores for different parts of the application:

### Dashboard Page

Dashboard Lighthouse Results

- Performance: 85
- Accessibility: 100
- Best Practices: 81

### Login Page

Login Lighthouse Results

- Performance: 97
- Accessibility: 94
- Best Practices: 100

### Suggestions for Improvement

- Eliminate render-blocking resources: Potential savings of 70 ms
- Minify JavaScript: Potential savings of 77 KiB
- Back/Forward Cache: Page prevented back/forward cache restoration due to three failure reasons

## License

This project is licensed under the MIT License. See the LICENSE file for details.
