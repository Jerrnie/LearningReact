import { formatter, calculateInvestmentResults } from "../util/investment";

export default function ResultTable({ investmentData }) {
  const data = investmentData;
  const initialInvestment = parseFloat(data.initialInvestment);
  const annualInvestment = parseFloat(data.anualInvestment);
  const expectedReturn = parseFloat(data.expectedReturn);
  const duration = parseFloat(data.duration);

  let tableData = calculateInvestmentResults({
    initialInvestment: initialInvestment,
    annualInvestment: annualInvestment,
    expectedReturn: expectedReturn,
    duration: duration
  });

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>

      <tbody>
        {tableData.map((rowData, rowIndex) => (
          <tr key={rowIndex}>
            <td>{rowData.year}</td>
            <td>{formatter.format(rowData.valueEndOfYear)}</td>
            <td>{formatter.format(rowData.interest)}</td>
            <td>{formatter.format(rowData.valueEndOfYear - initialInvestment - annualInvestment * (rowData.year))}</td>
            <td>{formatter.format(initialInvestment + annualInvestment * rowData.year)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
