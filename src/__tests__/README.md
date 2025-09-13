# Frontend Tests

This directory contains the comprehensive test suite for the Billdr frontend application.

## Test Structure

### Test Categories

1. **Components Tests** (`src/components/**/__tests__/`)
   - Payment components (StripePaymentForm, PaymentModal, PaymentStateDisplay)
   - Invoice components (InvoiceDetailsSection)
   - Tests for UI behavior, user interactions, and state management

2. **API Tests** (`src/api/__tests__/`)
   - Payment API functions
   - Invoice API functions
   - Tests for API calls, error handling, and data transformation

3. **Hook Tests** (`src/hooks/__tests__/`)
   - Custom React hooks using TanStack Query
   - Tests for data fetching, mutations, and cache management

### Test Utilities

- **test-utils.tsx**: Custom render function with providers (QueryClient, MantineProvider)
- **Mock data**: Pre-configured mock objects for invoices, customers, business owners, and payment transactions

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- PaymentModal.test.tsx

# Run tests matching a pattern
npm test -- --testNamePattern="payment"
```

## Test Setup

The test environment includes:
- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **jsdom**: DOM environment for Node.js
- **Mocked dependencies**: Stripe, TanStack Query, Next.js router

### Mocked Services

- **Stripe**: Payment processing functionality
- **TanStack Query**: Data fetching and caching
- **Next.js Router**: Navigation and routing
- **Global fetch**: API calls

## Writing Tests

### Component Tests
- Use the custom `render` function from `test-utils`
- Test user interactions with `fireEvent` and `userEvent`
- Assert on rendered content with `screen` queries
- Mock external dependencies appropriately

### API Tests
- Mock global `fetch` function
- Test both success and error scenarios
- Verify correct API endpoints and request formats
- Assert on returned data and error handling

### Hook Tests
- Use `renderHook` from React Testing Library
- Mock TanStack Query hooks for consistent behavior
- Test loading, success, and error states
- Verify query key patterns and cache invalidation

## Coverage Goals

- **Components**: Focus on user interactions and state changes
- **API Layer**: Test all endpoints and error scenarios
- **Hooks**: Verify query behavior and cache management
- **Critical paths**: Payment flows and invoice management

## Best Practices

1. **Isolation**: Each test should be independent
2. **Mocking**: Mock external dependencies consistently
3. **Assertions**: Test behavior, not implementation details
4. **Clarity**: Use descriptive test names and organize with `describe` blocks
5. **Cleanup**: Use `beforeEach` and `afterEach` for setup/teardown