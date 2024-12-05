import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from './App';

test('navigates to the About page when "About" link is clicked', async () => {
  render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
  );

  // "Home Page"가 기본적으로 렌더링되어 있는지 확인
  expect(screen.getByText(/Home Page/i)).toBeInTheDocument();

  // "About" 링크를 클릭
  const aboutLink = screen.getByText(/About/i);
  userEvent.click(aboutLink);

  // "About Page"가 렌더링되었는지 확인
  expect(await screen.findByText(/About Page/i)).toBeInTheDocument();
});
