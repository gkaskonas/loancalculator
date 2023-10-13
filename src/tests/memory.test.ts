import {
    postLoanCalculation,
    putLoanCalculation,
    getLoanCalculations,
    getLoanCalculation,
} from '../utils/memory' // Replace with the correct path to your module
import { displayCalculationsOverview } from '../utils/loan' // If needed, replace with the correct path
import { LoanCalculation } from '../types/loan'

// Mock data for testing
const mockLoanResult: LoanCalculation = {
    startDate: new Date('2023-01-01'),
    endDate: new Date('2023-01-10'),
    loanAmount: 1000,
    loanCurrency: 'USD',
    baseInterestRate: 5,
    margin: 2,
    details: [],
    totalInterest: '10',
    totalInterestWithoutMargin: '5',
}

describe('Loan Calculation Functions', () => {
    beforeEach(() => {
        // Clear loan calculations before each test
        while (getLoanCalculations().length > 0) {
            getLoanCalculations().pop()
        }
    })

    test('postLoanCalculation adds a loan calculation to the list', () => {
        postLoanCalculation(mockLoanResult)
        expect(getLoanCalculations()).toHaveLength(1)
    })

    test('putLoanCalculation updates an existing loan calculation', () => {
        // Add a loan calculation
        postLoanCalculation(mockLoanResult)

        // Update the loan calculation
        const updatedLoanResult = { ...mockLoanResult, loanAmount: 1500 }
        putLoanCalculation(updatedLoanResult, 0)

        const updatedCalculation = getLoanCalculation(0)
        expect(updatedCalculation.loanAmount).toEqual(1500)
    })

    test('getLoanCalculations returns the list of loan calculations', () => {
        // Add a loan calculation
        postLoanCalculation(mockLoanResult)

        const loanCalculations = getLoanCalculations()
        expect(loanCalculations).toHaveLength(1)
        expect(loanCalculations[0]).toEqual(mockLoanResult)
    })

    test('getLoanCalculation retrieves a specific loan calculation', () => {
        // Add a loan calculation
        postLoanCalculation(mockLoanResult)

        const retrievedCalculation = getLoanCalculation(0)
        expect(retrievedCalculation).toEqual(mockLoanResult)
    })

    test('displayCalculationsOverview displays loan calculations in a table', () => {
        // Suppress console.log for this test
        const originalConsoleLog = console.log
        console.log = jest.fn()

        // Add a loan calculation
        postLoanCalculation(mockLoanResult)

        // Display loan calculations overview
        displayCalculationsOverview()

        // Restore console.log
        console.log = originalConsoleLog

        // TODO: Add expectations for the console.log output
    })
})
