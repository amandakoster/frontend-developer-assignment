# Vehicle Data Dashboard

This project is a web application that displays vehicle data collected from a remote REST API. The application presents this data in a user-friendly dashboard that includes a table and a  doughnut chart data visualization with an informative Tooltip
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
- **Data Visualization:** Charts (doughnut, bar) to visualize vehicle data.
- **Responsive Design:** Adapts to different screen sizes.
- **Dynamic Data Fetching:** Periodically fetches updated data from the REST API.
- **Logout Confirmation:** Modal confirmation upon logout.
- **Accessible Design:** Ensures accessibility in color choices and design elements.

## Installation

To set up this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/repository-name.git
```

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
- Date Manipulation: Moment.js Design Considerations Responsive Design:
- Tailwind CSS is used to ensure the application is responsive across various devices.
- Accessibility: Colors are chosen to meet accessibility standards for color contrast and differentiation.
- User Experience: Includes confirmation modals and error handling to enhance user experience.

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

## License

This project is licensed under the MIT License. See the LICENSE file for details.
