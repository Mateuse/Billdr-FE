import React from 'react'
import { render, screen, fireEvent } from '../../../__tests__/utils/test-utils'
import { PaymentStateDisplay } from '../PaymentStateDisplay'
import { PAYMENT_FORM_STATE } from '../../../constants/payment'

describe('PaymentStateDisplay', () => {
  const defaultProps = {
    modalState: PAYMENT_FORM_STATE.INITIAL,
    isCreatingPaymentIntent: false,
    isPaymentIntentError: false,
    paymentIntentError: null,
    onRetry: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns null for initial state', () => {
    const { container } = render(<PaymentStateDisplay {...defaultProps} />)
    // With Mantine, styles are injected, so we check if there's no meaningful content
    const contentElements = container.querySelectorAll('[data-testid], [role], button, div:not([data-mantine-styles])')
    expect(contentElements.length).toBe(0)
  })

  it('shows loading overlay when loading', () => {
    const { container } = render(
      <PaymentStateDisplay
        {...defaultProps}
        modalState={PAYMENT_FORM_STATE.LOADING}
      />
    )

    expect(container.querySelector('.mantine-LoadingOverlay-root')).toBeInTheDocument()
  })

  it('shows loading overlay when creating payment intent', () => {
    const { container } = render(
      <PaymentStateDisplay
        {...defaultProps}
        isCreatingPaymentIntent={true}
      />
    )

    expect(container.querySelector('.mantine-LoadingOverlay-root')).toBeInTheDocument()
  })

  it('shows error alert when in error state', () => {
    render(
      <PaymentStateDisplay
        {...defaultProps}
        modalState={PAYMENT_FORM_STATE.ERROR}
      />
    )

    expect(screen.getByText('Payment Setup Error')).toBeInTheDocument()
    expect(screen.getByText('Failed to create payment intent')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('shows error alert when payment intent creation fails', () => {
    const error = { message: 'Payment intent creation failed' }
    render(
      <PaymentStateDisplay
        {...defaultProps}
        isPaymentIntentError={true}
        paymentIntentError={error}
      />
    )

    expect(screen.getByText('Payment Setup Error')).toBeInTheDocument()
    expect(screen.getByText('Payment intent creation failed')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument()
  })

  it('shows success alert when in success state', () => {
    render(
      <PaymentStateDisplay
        {...defaultProps}
        modalState={PAYMENT_FORM_STATE.SUCCESS}
      />
    )

    expect(screen.getByText('Payment Success')).toBeInTheDocument()
    expect(screen.getByText(/payment has been processed successfully/i)).toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', () => {
    render(
      <PaymentStateDisplay
        {...defaultProps}
        modalState={PAYMENT_FORM_STATE.ERROR}
      />
    )

    const retryButton = screen.getByRole('button', { name: /retry/i })
    fireEvent.click(retryButton)

    expect(defaultProps.onRetry).toHaveBeenCalled()
  })

  it('handles null payment intent error gracefully', () => {
    render(
      <PaymentStateDisplay
        {...defaultProps}
        isPaymentIntentError={true}
        paymentIntentError={null}
      />
    )

    expect(screen.getByText('Payment Setup Error')).toBeInTheDocument()
    expect(screen.getByText('Failed to create payment intent')).toBeInTheDocument()
  })

  it('handles payment intent error without message', () => {
    const error = {} // Error object without message
    render(
      <PaymentStateDisplay
        {...defaultProps}
        isPaymentIntentError={true}
        paymentIntentError={error}
      />
    )

    expect(screen.getByText('Payment Setup Error')).toBeInTheDocument()
    expect(screen.getByText('Failed to create payment intent')).toBeInTheDocument()
  })
})