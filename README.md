# API Testing Framework

A robust API testing framework built with TypeScript, Mocha, and Supertest.

## Features

- TypeScript support
- Mocha test framework
- Chai assertions
- Supertest for API testing
- Environment configuration
- Logging system
- Response validation
- Test data generation

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd api-testing-framework
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:
```env
API_BASE_URL=your_api_base_url
API_KEY=your_api_key
```

## Usage

### Running Tests

Run all tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Project Structure

```
api-testing-framework/
├── src/
│   ├── api/              # API client implementations
│   ├── config/           # Configuration files
│   ├── models/           # Type definitions
│   ├── utils/            # Helper functions
│   └── __tests__/        # Test files
├── .env                  # Environment variables
├── .mocharc.json         # Mocha configuration
├── package.json          # Project dependencies
└── tsconfig.json         # TypeScript configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 