import React from 'react'
import { render, screen } from '../../../../__tests__/utils/test-utils'
import { InvoiceDetailsSection } from '../InvoiceDetailsSection'
import { mockInvoice } from '../../../../__tests__/utils/test-utils'

// Mock DataSection component
jest.mock('../../../shared/DataSection', () => ({
  DataSection: ({ title, fields, icon }: { title: string; fields: { key: string; label: string; value: string; type?: string; color?: string }[]; icon?: React.ReactNode }) => (
    <div data-testid="data-section">
      <h3>{title}</h3>
      {icon && <span data-testid="section-icon">{icon}</span>}
      {fields.map((field: { key: string; label: string; value: string; type?: string; color?: string }) => (
        <div key={field.key} data-testid={`field-${field.key}`}>
          <span data-testid={`label-${field.key}`}>{field.label}:</span>
          <span
            data-testid={`value-${field.key}`}
            style={{ color: field.color }}
          >
            {field.type === 'currency' ? `$${field.value}` : field.value}
          </span>
        </div>
      ))}
    </div>
  ),
}))

describe('InvoiceDetailsSection', () => {
  const invoiceWithBalance = {
    ...mockInvoice,
    total_amount: '100.00',
    amount_paid: '30.00',
    issued_at: '2023-12-01T00:00:00Z',
    due_date: '2024-01-01',
    updated_at: '2023-12-01T00:00:00Z',
  }

  const paidInvoice = {
    ...mockInvoice,
    total_amount: '100.00',
    amount_paid: '100.00',
    issued_at: '2023-12-01T00:00:00Z',
    due_date: '2024-01-01',
    updated_at: '2023-12-01T00:00:00Z',
  }

  it('renders balance details section', () => {
    render(<InvoiceDetailsSection invoice={invoiceWithBalance} />)

    expect(screen.getByText('Balance Details')).toBeInTheDocument()
    expect(screen.getByTestId('label-total_amount')).toHaveTextContent('Amount:')
    expect(screen.getByTestId('value-total_amount')).toHaveTextContent('$100.00')
    expect(screen.getByTestId('label-amount_paid')).toHaveTextContent('Amount Paid:')
    expect(screen.getByTestId('value-amount_paid')).toHaveTextContent('$30.00')
  })

  it('renders dates section with icon', () => {
    render(<InvoiceDetailsSection invoice={invoiceWithBalance} />)

    expect(screen.getByText('Important Dates')).toBeInTheDocument()
    expect(screen.getByTestId('section-icon')).toBeInTheDocument()
    expect(screen.getByTestId('label-issued_at')).toHaveTextContent('Issued At:')
    expect(screen.getByTestId('label-due_date')).toHaveTextContent('Due Date:')
    expect(screen.getByTestId('label-updated_at')).toHaveTextContent('Updated At:')
  })

  it('calculates remaining balance correctly', () => {
    render(<InvoiceDetailsSection invoice={invoiceWithBalance} />)

    expect(screen.getByTestId('label-remaining_balance')).toHaveTextContent('Remaining Balance:')
    expect(screen.getByTestId('value-remaining_balance')).toHaveTextContent('$70')
  })

  it('shows remaining balance when amount is owed', () => {
    render(<InvoiceDetailsSection invoice={invoiceWithBalance} />)

    const remainingBalanceValue = screen.getByTestId('value-remaining_balance')
    expect(remainingBalanceValue).toHaveTextContent('$70')
  })

  it('shows remaining balance when fully paid', () => {
    render(<InvoiceDetailsSection invoice={paidInvoice} />)

    const remainingBalanceValue = screen.getByTestId('value-remaining_balance')
    expect(remainingBalanceValue).toHaveTextContent('$0')
  })

  it('renders all currency fields with proper formatting', () => {
    render(<InvoiceDetailsSection invoice={invoiceWithBalance} />)

    expect(screen.getByTestId('value-total_amount')).toHaveTextContent('$100.00')
    expect(screen.getByTestId('value-amount_paid')).toHaveTextContent('$30.00')
    expect(screen.getByTestId('value-remaining_balance')).toHaveTextContent('$70')
  })

  it('handles zero amounts correctly', () => {
    const zeroAmountInvoice = {
      ...mockInvoice,
      total_amount: '0.00',
      amount_paid: '0.00',
    }

    render(<InvoiceDetailsSection invoice={zeroAmountInvoice} />)

    expect(screen.getByTestId('value-total_amount')).toHaveTextContent('$0.00')
    expect(screen.getByTestId('value-amount_paid')).toHaveTextContent('$0.00')
    expect(screen.getByTestId('value-remaining_balance')).toHaveTextContent('$0')
  })

  it('renders both data sections', () => {
    render(<InvoiceDetailsSection invoice={invoiceWithBalance} />)

    const dataSections = screen.getAllByTestId('data-section')
    expect(dataSections).toHaveLength(2)
  })
})