import { LoanCalculation, LoanInput } from '../types/loan'
import Table from 'cli-table'
import {
    getLoanCalculation,
    getLoanCalculations,
    putLoanCalculation,
} from './memory'

/**
 * Calculates loan interest and updates loan calculations array.
 *
 * @param loan - Loan input parameters.
 */
export function calculateLoanInterest(loan: LoanInput): LoanCalculation {
    // Extract input parameters from the loan object
    const {
        startDate,
        endDate,
        loanAmount,
        baseInterestRate,
        margin,
        loanCurrency,
    } = loan

    // Calculate the total interest rate, and total number of days in the loan period
    const totalInterestRate = baseInterestRate + margin
    const totalDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    )

    // Calculate daily interest without margin and accrued daily interest
    const dailyInterestWithoutMargin =
        (loanAmount * baseInterestRate) / 100 / 365
    const dailyInterestAccrued = (loanAmount * totalInterestRate) / 100 / 365

    // Initialize an array to store loan details for each day
    const loanDetails = []

    // Loop through each day of the loan period to calculate accrued interest details
    for (let day = 0; day < totalDays; day++) {
        const accruedDate = new Date(startDate)
        accruedDate.setDate(accruedDate.getDate() + day)

        loanDetails.push({
            accrualDate: accruedDate.toISOString().split('T')[0],
            daysElapsed: day,
            dailyInterestWithoutMargin: dailyInterestWithoutMargin.toFixed(2),
            dailyInterestAccrued: dailyInterestAccrued.toFixed(2),
        })
    }

    // Calculate total interest over the loan period
    const totalInterest = dailyInterestAccrued * totalDays
    const totalInterestWithoutMargin = dailyInterestWithoutMargin * totalDays

    // Create the loan result object with all calculated details
    const loanResult: LoanCalculation = {
        startDate: startDate,
        endDate: endDate,
        loanAmount,
        loanCurrency,
        baseInterestRate,
        margin,
        details: loanDetails,
        totalInterest: totalInterest.toFixed(2),
        totalInterestWithoutMargin: totalInterestWithoutMargin.toFixed(2),
    }

    return loanResult
}

/**
 * Displays an overview of all loan calculations in a table format.
 *
 * @param index - Index of the loan calculation to display.
 */
export function displayCalculationsOverview(index?: number): void {
    const loanCalculations = getLoanCalculations()

    if (loanCalculations.length === 0) {
        throw new Error('No loan calculations available.')
    }

    const table = new Table({
        head: [
            'Calculation',
            'Start Date',
            'End Date',
            'Loan Amount',
            'Loan Currency',
            'Base Rate',
            'Margin',
            'Total Interest',
            'Total Interest Without Margin',
        ],
        colWidths: [15, 12, 12, 15, 15, 20, 10, 20, 30],
    })

    if (index) {
        try {
            const calculation = loanCalculations[index]
            table.push([
                (index + 1).toString(),
                calculation.startDate.toISOString().split('T')[0],
                calculation.endDate.toISOString().split('T')[0],
                calculation.loanAmount.toString(),
                calculation.loanCurrency.toString(),
                calculation.baseInterestRate.toString(),
                calculation.margin.toString(),
                calculation.totalInterest,
                calculation.totalInterestWithoutMargin,
            ])
            console.log(table.toString())
            return
        } catch (error) {
            throw new Error('No loan calculation available at this index.')
        }
    }

    loanCalculations.forEach((calculation, index) => {
        table.push([
            (index + 1).toString(),
            calculation.startDate.toISOString().split('T')[0],
            calculation.endDate.toISOString().split('T')[0],
            calculation.loanAmount.toString(),
            calculation.loanCurrency.toString(),
            calculation.baseInterestRate.toString(),
            calculation.margin.toString(),
            calculation.totalInterest,
            calculation.totalInterestWithoutMargin,
        ])
    })

    console.log(table.toString())
}

/**
 * Displays the daily interest details for a specific loan calculation in a table format.
 *
 * @param index - Index of the loan calculation to display.
 */
export function displayDailyInterest(index: number): void {
    const calculation = getLoanCalculation(index)

    if (!calculation) {
        console.log('No loan calculation available at this index.')
        return
    }
    if (!calculation.details || calculation.details.length === 0) {
        console.log('No daily interest details available for this calculation.')
        return
    }

    const table = new Table({
        head: [
            'Accrual Date',
            'Days Elapsed',
            'Daily Interest (Without Margin)',
            'Daily Interest (Accrued)',
        ],
        colWidths: [15, 15, 30, 30],
    })

    calculation.details.forEach((detail) => {
        table.push([
            detail.accrualDate,
            detail.daysElapsed.toString(),
            detail.dailyInterestWithoutMargin,
            detail.dailyInterestAccrued,
        ])
    })

    console.log(`Daily Interest Details for Calculation:`)
    console.log(table.toString())
}

/**
 * Updates an existing loan calculation based on user input.
 *
 * @param index - Index of the loan calculation to update.
 * @param loan - Loan Input parameters.
 */
export function updateLoanCalculation(index: number, loan: LoanInput): void {
    const loanCalculations = getLoanCalculations()

    if (loanCalculations.length === 0) {
        throw new Error('No loan calculations available.')
    }

    if (index < 0 || index > loanCalculations.length)
        throw new Error('Invalid index.')

    const updatedCalculation = calculateLoanInterest(loan)
    putLoanCalculation(updatedCalculation, index)
}
