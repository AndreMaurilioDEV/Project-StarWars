import { getAllByRole, getByText, render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


test('Renderiza planeta pelo input text', async () => {
    render(<App/>);
    const inpText = screen.getByTestId('name-filter');
    expect(inpText).toBeInTheDocument();
    await userEvent.type(inpText, 'oo');
});

test('Filtro orbital e maior que', async () => {
  render(<App/>);
  const selectColumn = screen.getByTestId('column-filter');
  expect(selectColumn).toBeInTheDocument();
  const selectComparasion = screen.getByTestId('comparison-filter');
  expect(selectComparasion).toBeInTheDocument();
  const selectValue = screen.getByTestId('value-filter');
  expect(selectValue).toBeInTheDocument();
  const btnFilter = screen.getByTestId('button-filter');
  expect(btnFilter).toBeInTheDocument();
  await userEvent.selectOptions(selectColumn, 'orbital_period');
  await userEvent.selectOptions(selectComparasion, 'maior que');
  await userEvent.type(selectValue, '5000' );
  await userEvent.click(btnFilter);
  const tableRows = screen.getAllByRole('row');
  expect(tableRows).toHaveLength(1);
});


