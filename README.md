# QuantUI

QuantUI is a modern desktop application that provides a flexible, customizable interface for algorithmic trading systems. Built with Wails (Go + ReactJs), it enables traders and developers to create, monitor, and control their trading strategies through a dynamic, real-time interface.

## Key Features

### Trading-Specific Features
- Real-time market data visualization and monitoring
- Dynamic strategy parameter controls
- Order management and execution interface
- Position and portfolio tracking
- Custom trading action triggers
- Strategy performance metrics dashboard

### Technical Features
- Dynamic UI generation based on strategy specifications
- Real-time metric monitoring and visualization
- Custom action execution framework
- NATS integration for high-performance messaging
- Modern, responsive user interface with Material Design
- Cross-platform support (Windows, macOS, Linux)

## Technology Stack

### Frontend
- React 18 with TypeScript
- Material UI (MUI) for modern, consistent design
- Vite for fast development and building
- Modern CSS with responsive design
- Real-time data visualization libraries
- MUI Data Grid for advanced data tables

### Backend
- Go 1.23+ for high-performance trading operations
- Wails v2 framework for desktop integration
- NATS messaging system for real-time communication
- Custom trading strategy integration framework

## Architecture

- **Frontend**: ReactJS with Material UI
  - Dynamic component generation
  - Real-time data updates
  - Custom trading controls
  - Material Design components
  - Responsive layouts
- **Backend**: Go with Wails framework
  - Market data processing
- **Communication**: Embedded or external NATS messaging service
  - High-performance message passing
  - Real-time data streaming
  - Event-driven architecture
- **UI Framework**: Custom dynamic UI generation
  - Custom actions
  - Real-time data visualization
  - Material Design theming

## Prerequisites

- Go 1.23 or later
- Node.js v20 or later
- NATS server (optional, for production)
- Wails CLI (`go install github.com/wailsapp/wails/v2/cmd/wails@latest`)

## Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/rangertaha/QuantUI.git
   cd QuantUI
   ```

2. Install dependencies:
   ```bash
   # Install Go dependencies
   go mod download

   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. Start development:
   ```bash
   wails dev
   ```

## Development

### Local Development
1. Start the development server:
   ```bash
   wails dev
   ```

   Go to : http://localhost:34115

   

2. Build the application:
   ```bash
   wails build
   ```

### Testing
Run the test suite:
```bash
go test ./...
```

### Build
Create a production build:
```bash
wails build -production
```
The built application will be available in the `build/bin` directory.

## Project Structure

```
QuantUI/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   │   ├── components/  # UI components
│   │   ├── pages/      # Page components
│   │   └── utils/      # Utility functions
│   ├── dist/          # Built frontend files
│   └── package.json   # Frontend dependencies
├── main.go            # Application entry point
├── app.go             # Main application logic
└── wails.json        # Wails configuration
```

## Configuration

The application can be configured through:
- `wails.json` for Wails-specific settings
- Environment variables for runtime configuration
- NATS connection settings (if using external NATS server)

## Troubleshooting

Common issues and solutions:

1. **Build fails**
   - Ensure all prerequisites are installed
   - Check Go and Node.js versions
   - Clear build cache: `wails clean`

2. **NATS connection issues**
   - Verify NATS server is running
   - Check connection settings
   - Ensure proper network access

## License

This project is licensed under the terms included in the LICENSE file.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, please:
1. Check the troubleshooting section
2. Search existing issues
3. Create a new issue if needed