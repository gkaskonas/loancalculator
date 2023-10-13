export const schema = {
  properties: {
    startDate: {
      description: "Enter new Start Date (YYYY-MM-DD)",
      pattern: /^\d{4}-\d{2}-\d{2}$/,
      message: "Please enter a valid date in the format YYYY-MM-DD.",
      required: true,
    },
    endDate: {
      description: "Enter new End Date (YYYY-MM-DD)",
      pattern: /^\d{4}-\d{2}-\d{2}$/,
      message: "Please enter a valid date in the format YYYY-MM-DD.",
      required: true,
    },
    loanAmount: {
      description: "Enter new Loan Amount",
      pattern: /^[1-9]\d*(\.\d+)?$/,
      message: "Please enter a valid number.",
      required: true,
    },
    loanCurrency: {
      description: "Enter new Loan Currency",
      pattern: /^[A-Za-z]+$/,
      message: "Please enter a valid currency.",
      required: true,
    },
    baseInterestRate: {
      description: "Enter new Base Interest Rate (%)",
      pattern: /^[1-9]\d*(\.\d+)?$/,
      message: "Please enter a valid number.",
      required: true,
    },
    margin: {
      description: "Enter new Margin (%)",
      pattern: /^[1-9]\d*(\.\d+)?$/,
      message: "Please enter a valid number.",
      required: true,
    },
  },
};

export const updateSchema = {
  properties: {
    selectedCalculation: {
      description: "Select a calculation to update (enter the number)",
      pattern: /^[1-9]\d*$/,
      message: "Please enter a valid number.",
      required: true,
    },
    ...schema.properties,
  },
};

export const commandSchema = {
  properties: {
    command: {
      description: "Enter a command (create, view, update, stop)",
      pattern: /^(create|view|update|stop)$/,
      message: "Please enter a valid command.",
      required: true,
    },
  },
};
