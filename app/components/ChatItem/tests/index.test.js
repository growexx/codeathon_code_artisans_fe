import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ChatItem from '../index';
import 'jest-dom/extend-expect';

describe('<ChatItem />', () => {
  it('should render without error ', async () => {
    render(<ChatItem bot skeleton />);
  });

  it('should render question', async () => {
    const { getByText } = render(<ChatItem content="test question" />);
    await waitFor(() => {
      expect(getByText('test question')).toBeInTheDocument();
    });
  });

  it('should render answer with typing', async () => {
    const { getByText } = render(<ChatItem content="answer" bot typing />);
    await waitFor(() => {
      expect(getByText('answer')).toBeInTheDocument();
    });
  });

  it('should show sources', async () => {
    const { getByText } = render(<ChatItem bot content="answer" />);
    await waitFor(() => {
      fireEvent.click(getByText('Sources'));
      expect(getByText('answer')).toBeInTheDocument();
    });
  });
});
