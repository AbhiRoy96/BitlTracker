# BitTracker

BitTracker is a multifaceted web application built with Angular that integrates cryptocurrency market tracking with global shipping and logistics management. It provides real-time data on Bitcoin prices, market trends, and a comprehensive platform for finding shipping quotes between global ports.

![BitTracker Logo](src/assets/bitracker.png)

## 🚀 Features

### 🪙 Cryptocurrency Dashboard
- **Real-time Bitcoin Price**: Track live Bitcoin prices with 24-hour change percentages, powered by WebSocket streaming.
- **Market Statistics**: View market cap, circulating supply, 24-hour high/low, and total volume.
- **Interactive Trends**: Visualize Bitcoin market trends with interactive [Chart.js](https://www.chartjs.org/) charts (1-hour and 1-day views).
- **Global Currency Support**: Compare prices against multiple fiat currencies including INR, USD, CAD, GBP, EUR, JPY, and RUB.
- **Top 10 Leaderboard & News**: Stay updated with the top-performing cryptocurrencies and the latest crypto news via the integrated news feed.

### 🚢 Shipping & Logistics
- **Global Trade Connectivity**: Connect to key markets across the globe with an unrivaled shipping expertise platform.
- **Multi-Modal Shipment Support**: Find shipping quotes for various cargo types:
    - **FCL (Full Container Load)**: For standard 20ft, 40ft, and 40ft High Cube containers.
    - **LCL (Less than Container Load)**: For smaller shipments in shared containers, including specialized 5000kg/7000kg pellet boxes.
    - **Bulk Carrier Services**: Comprehensive support for large-scale shipments via Handysize, Handymax, Supramax, Ultramax, Panamax, and Capsize bulk carriers.
    - **Specialized Cargo**: Support for temperature-controlled **Reefer** containers (20ft and 40ft).
- **Interactive Map**: Visualize shipping routes and port locations using integrated Google Maps ([@agm/core](https://angular-maps.com/)).
- **Intelligent Quote Engine**: Get accurate carrier offers by specifying origin/discharge ports, container types, shipment dates, and gross weight.
- **End-to-End Booking Workflow**:
    - **Search**: Select ports from an extensive global list.
    - **Compare**: View and compare live offers from leading carriers (Maersk, MSC, COSCO, Hapag-Lloyd, Evergreen, etc.).
    - **Book**: Securely book shipments through an integrated Ethereum payment gateway.
    - **Blockchain Security**: Leverage **Ethereum Smart Contracts** for transparent and immutable booking records.
    - **Track**: Automated Air Waybill (AWB) generation and transaction fingerprinting for shipment tracking.

## 🚀 Technical Highlights

- **Blockchain-Powered Payments**: Integrates **Ethereum** for secure, decentralized freight payments, supporting **MetaMask** for transaction signing.
- **Smart Contract Integration**: Utilizes smart contracts on the **Ropesten Test Network** to automate and secure the booking process.
- **Real-time Data Streaming**: Utilizes **Socket.io** to establish a persistent connection with market data providers for instantaneous price updates.
- **Reactive Architecture**: Leverages **RxJS** observables for efficient data handling and seamless UI updates.
- **Multi-modal Logistics**: Implements complex logic to handle different shipping modes (FCL, LCL, Bulk) with dynamic pricing models.
- **Geospatial Visualization**: Deep integration with Google Maps API to provide visual context for global shipping routes.

## 🛠️ Tech Stack

- **Frontend Framework**: [Angular](https://angular.io/) (v5.2.0)
- **State & Data Streams**: [RxJS](https://rxjs-dev.firebaseapp.com/) (v5.5.6)
- **Real-time Communication**: [Socket.io-client](https://socket.io/)
- **Blockchain & Smart Contracts**: [Ethereum](https://ethereum.org/), [Web3.js](https://web3js.readthedocs.io/), [MetaMask](https://metamask.io/)
- **Test Network**: [Ropesten](https://ropsten.etherscan.io/)
- **Data Visualization**: [Chart.js](https://www.chartjs.org/)
- **Maps Integration**: [@agm/core](https://angular-maps.com/) (Angular Google Maps)
- **Styling**: Bootstrap, Font Awesome
- **Icons & Graphics**: Custom SVGs and shipping line logos (Maersk, MSC, COSCO, etc.)

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (Compatible with Angular 5.2.0 dependencies)
- [Angular CLI](https://github.com/angular/angular-cli)

### Configuration
Before running the application, you need to configure your environment variables.
1. Open `src/environments/environment.ts` (for development) and `src/environments/environment.prod.ts` (for production).
2. Replace the placeholders with your actual keys:
   - `googleMapsApiKey`: Your Google Maps API key.
   - `internalApiKey`: The API key for internal logistics services.
   - `merchantEthereumAddress`: The Ethereum address where payments should be sent.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bit-tracker.git
   cd bit-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 🛠️ Build & Test

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
```bash
ng build --prod
```

### Running Unit Tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running End-to-End Tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Backend 
For backend of this Application look at -> [BitlTrackerBackend](https://github.com/AbhiRoy96/BitlTrackerBackend).

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*© 2019. Bit Tracker & Co.*
