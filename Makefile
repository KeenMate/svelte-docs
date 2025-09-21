# Svelte Documentation Library Makefile
# Cross-platform commands for development and deployment

.PHONY: help install dev build package preview clean lint format test deploy

# Default target
help: ## Show this help message
	@echo "Svelte Documentation Library - Available Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

# Development Commands
install: ## Install dependencies
	npm install

dev: ## Start development server
	npm run dev

dev-open: ## Start development server and open browser
	npm run dev -- --open

build: ## Build the static site
	npm run build

package: ## Build the library package
	npm run package

preview: ## Preview the production build
	npm run preview

# Quality Commands
check: ## Run TypeScript checks
	npm run check

check-watch: ## Run TypeScript checks in watch mode
	npm run check:watch

lint: ## Run linting (if configured)
	@if npm run lint --silent 2>/dev/null; then \
		npm run lint; \
	else \
		echo "No linting configured"; \
	fi

format: ## Format code (if prettier is configured)
	@if npm run format --silent 2>/dev/null; then \
		npm run format; \
	else \
		echo "No formatting configured"; \
	fi

# Testing Commands
test: ## Run tests (if configured)
	@if npm run test --silent 2>/dev/null; then \
		npm run test; \
	else \
		echo "No tests configured"; \
	fi

test-watch: ## Run tests in watch mode (if configured)
	@if npm run test:watch --silent 2>/dev/null; then \
		npm run test:watch; \
	else \
		echo "No test watch mode configured"; \
	fi

# Publishing Commands
publish-check: package ## Check package before publishing
	npm publish --dry-run

publish: package ## Publish package to NPM
	@echo "Publishing package to NPM..."
	npm publish

# Cleanup Commands
clean: ## Clean build artifacts
	@echo "Cleaning build artifacts..."
	@if exist build rmdir /s /q build 2>nul || rm -rf build 2>/dev/null || true
	@if exist dist rmdir /s /q dist 2>nul || rm -rf dist 2>/dev/null || true
	@if exist .svelte-kit rmdir /s /q .svelte-kit 2>nul || rm -rf .svelte-kit 2>/dev/null || true
	@echo "Clean completed"

clean-all: clean ## Clean all artifacts including node_modules
	@echo "Cleaning all artifacts..."
	@if exist node_modules rmdir /s /q node_modules 2>nul || rm -rf node_modules 2>/dev/null || true
	@echo "All clean completed"

# Deployment Commands
deploy-build: build ## Build for deployment
	@echo "Built static site ready for deployment in 'build/' directory"

deploy-netlify: build ## Deploy to Netlify (requires netlify-cli)
	@if command -v netlify >/dev/null 2>&1 || where netlify >nul 2>&1; then \
		netlify deploy --prod --dir=build; \
	else \
		echo "Netlify CLI not found. Install with: npm install -g netlify-cli"; \
	fi

deploy-vercel: build ## Deploy to Vercel (requires vercel-cli)
	@if command -v vercel >/dev/null 2>&1 || where vercel >nul 2>&1; then \
		vercel --prod build; \
	else \
		echo "Vercel CLI not found. Install with: npm install -g vercel"; \
	fi

# GitHub Pages deployment (static files)
deploy-gh-pages: build ## Deploy to GitHub Pages
	@echo "To deploy to GitHub Pages:"
	@echo "1. Push the 'build' directory contents to your gh-pages branch"
	@echo "2. Or use a GitHub Action for automatic deployment"

# Development Workflow Commands
setup: install ## Complete development setup
	@echo "Development setup completed!"
	@echo "Run 'make dev' to start development server"

full-build: clean install build package ## Full clean build and package
	@echo "Full build completed!"
	@echo "Static site: build/"
	@echo "NPM package: dist/"

# Docker Commands (optional)
docker-build: ## Build Docker image (if Dockerfile exists)
	@if [ -f Dockerfile ]; then \
		docker build -t svelte-docs .; \
	else \
		echo "No Dockerfile found"; \
	fi

docker-run: ## Run Docker container (if image exists)
	@if docker images -q svelte-docs >/dev/null 2>&1; then \
		docker run -p 3000:3000 svelte-docs; \
	else \
		echo "Docker image not found. Run 'make docker-build' first"; \
	fi

# Git workflow helpers
git-status: ## Show git status with helpful info
	@echo "=== Git Status ==="
	@git status --short
	@echo ""
	@echo "=== Current Branch ==="
	@git branch --show-current
	@echo ""
	@echo "=== Recent Commits ==="
	@git log --oneline -5

commit: ## Quick commit workflow
	@echo "=== Staging changes ==="
	@git add .
	@echo "=== Current staged changes ==="
	@git diff --cached --name-status
	@echo ""
	@read -p "Enter commit message: " message; \
	git commit -m "$$message"

# Information Commands
info: ## Show project information
	@echo "=== Project Information ==="
	@echo "Name: $(shell node -p "require('./package.json').name")"
	@echo "Version: $(shell node -p "require('./package.json').version")"
	@echo "Description: $(shell node -p "require('./package.json').description")"
	@echo ""
	@echo "=== Dependencies ==="
	@npm ls --depth=0 2>/dev/null || echo "Run 'make install' first"

deps: ## Show dependency information
	@echo "=== Production Dependencies ==="
	@npm ls --prod --depth=0 2>/dev/null || echo "Run 'make install' first"
	@echo ""
	@echo "=== Development Dependencies ==="
	@npm ls --dev --depth=0 2>/dev/null || echo "Run 'make install' first"

outdated: ## Check for outdated packages
	npm outdated

update: ## Update all dependencies
	npm update

# Environment specific builds
build-dev: ## Build with development settings
	NODE_ENV=development npm run build

build-prod: ## Build with production settings
	NODE_ENV=production npm run build

# Quick shortcuts
b: build ## Shortcut for build
d: dev ## Shortcut for dev
p: package ## Shortcut for package
c: clean ## Shortcut for clean
i: install ## Shortcut for install