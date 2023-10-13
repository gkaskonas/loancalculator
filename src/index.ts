// main.ts
import prompt from 'prompt'
import { LoanInput } from './types/loan'
import { commandSchema, schema, updateSchema } from './utils/prompt'
import {
    calculateLoanInterest,
    displayCalculationsOverview,
    displayDailyInterest,
    updateLoanCalculation,
} from './utils/loan'
import { postLoanCalculation } from './utils/memory'

prompt.start()

function promptUser(): void {
    prompt.get(commandSchema, (err, result) => {
        const command = result.command.toString().toLowerCase()

        switch (command) {
            case 'create':
                prompt.get(schema, (err, result) => {
                    try {
                        const loan: LoanInput = {
                            startDate: new Date(result.startDate.toString()),
                            endDate: new Date(result.endDate.toString()),
                            loanAmount: parseFloat(
                                result.loanAmount.toString()
                            ),
                            loanCurrency: result.loanCurrency.toString(),
                            baseInterestRate: parseFloat(
                                result.baseInterestRate.toString()
                            ),
                            margin: parseFloat(result.margin.toString()),
                        }
                        const loanCalculation = calculateLoanInterest(loan)
                        postLoanCalculation(loanCalculation)
                        displayCalculationsOverview()
                        promptUser()
                    } catch (error) {
                        console.log(error.message)
                        promptUser()
                    }
                })
                break

            case 'view':
                prompt.get(['index'], (err, result) => {
                    try {
                        const index = parseInt(result.index.toString()) - 1
                        displayDailyInterest(index)
                        displayCalculationsOverview(index)
                        promptUser()
                    } catch (error) {
                        console.log(error.message)
                        promptUser()
                    }
                })
                break

            case 'update':
                prompt.get(updateSchema, (err, result) => {
                    try {
                        const loan: LoanInput = {
                            startDate: new Date(result.startDate.toString()),
                            endDate: new Date(result.endDate.toString()),
                            loanAmount: parseFloat(
                                result.loanAmount.toString()
                            ),
                            loanCurrency: result.loanCurrency.toString(),
                            baseInterestRate: parseFloat(
                                result.baseInterestRate.toString()
                            ),
                            margin: parseFloat(result.margin.toString()),
                        }
                        const index =
                            parseInt(result.selectedCalculation.toString()) - 1
                        updateLoanCalculation(index, loan)
                        displayCalculationsOverview()
                        promptUser()
                    } catch (error) {
                        promptUser()
                    }
                })
                break

            case 'stop':
                console.log('Exiting the program.')
                break

            default:
                console.log('Invalid command. Please enter a valid command.')
                promptUser()
        }
    })
}

// Start the application
console.log('Loan Interest Calculator')
promptUser()
