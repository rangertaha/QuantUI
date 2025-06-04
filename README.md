# QuantUI

QuantUI is a modern desktop application built with Wails (Go + Web Technologies) that provides a dynamically generated user interface for monitoring real-time metrics and executing custom actions.

## Features

- Real-time metric monitoring and visualization
- Dynamic UI generation based on specifications
- Custom action execution
- NATS integration for backend communication
- Modern, responsive user interface
- Cross-platform support (Windows, macOS, Linux)

## Technology Stack

### Frontend
- React 18
- TypeScript
- Vite for build tooling
- Modern CSS features

### Backend
- Go 1.23+
- Wails v2 framework
- NATS messaging system

## Architecture

- **Frontend**: ReactJS (HTML, CSS, TypeScript)
- **Backend**: Go with Wails framework
- **Communication**: Embedded or external NATS messaging service
- **UI Framework**: Custom dynamic UI generation

## Prerequisites

- Go 1.23 or later
- Node.js v20 or later
- NATS server (optional, for production)
- Wails CLI (`go install github.com/wailsapp/wails/v2/cmd/wails@latest`)

## Installation

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

## Development

1. Start the development server:
   ```bash
   wails dev
   ```

2. Build the application:
   ```bash
   wails build
   ```

## Testing

Run the test suite:
```bash
go test ./...
```

## Building

To create a production build:

```bash
wails build -production
```

The built application will be available in the `build/bin` directory.

## Project Structure

```
QuantUI/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── dist/          # Built frontend files
│   └── package.json   # Frontend dependencies
├── main.go            # Application entry point
├── app.go             # Main application logic
└── wails.json         # Wails configuration
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