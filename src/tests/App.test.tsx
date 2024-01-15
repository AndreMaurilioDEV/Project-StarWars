import React from 'react';
import { getByText, render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


test('Renderiza planeta pelo input text', async () => {
    render(<App/>);
    const inpText = screen.getByTestId('name-filter');
    expect(inpText).toBeInTheDocument();
    await userEvent.type(inpText, 'oo');
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Naboo')).toBeInTheDocument();
});

test('filtro population e menor que', async () => {
  render(<App/>);
  
  const selectColumn = screen.getByTestId('column-filter');
  expect(selectColumn).toBeInTheDocument();
  const selectComparasion = screen.getByTestId('comparison-filter');
  expect(selectComparasion).toBeInTheDocument();
  const selectValue = screen.getByTestId('value-filter');
  expect(selectValue).toBeInTheDocument();
  await userEvent.selectOptions(selectColumn, 'population');
  await userEvent.selectOptions(selectComparasion, 'menor que');
  await userEvent.type(selectValue, '5000' );
  expect(screen.getByText('Yavin IV')).toBeInTheDocument();
})
