.PHONY: build run clean


help:
	@grep -E '^[1-3a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-10s\033[0m %s\n", $$1, $$2}'

build: ## Build the CLI version
	@echo "Building CLI version..."
	@go mod tidy
	@go build -o build/bin/hyperio cmd/cli/main.go
	@wails build

run: build ## Run the CLI
	@echo "Running CLI version..."
	@./bin/hyperio

dev: ## Run the UI
	@wails dev

clean: ## Clean the build artifacts
	@echo "Cleaning build artifacts..."
	@rm -rf build/bin/hyperio
	@rm -rf build/bin/hyperio-ui