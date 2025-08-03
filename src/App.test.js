import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('To-Do List App', () => {
  test('renders the title', () => {
    render(<App />);
    const titleElement = screen.getByText(/To-Do List/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('adds a task when input and button are used', () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Add a task.../i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: 'Test Task' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Test Task/i)).toBeInTheDocument();
  });

  test('does not add empty task', () => {
    render(<App />);
    const addButton = screen.getByText(/Add Task/i);
    fireEvent.click(addButton);

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems.length).toBe(0); // No task should be added
  });

  test('marks a task as completed', () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Add a task.../i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: 'Complete Me' } });
    fireEvent.click(addButton);

    const completeButton = screen.getByText('✔');
    fireEvent.click(completeButton);

    const completedText = screen.getByText(/Complete Me/i);
    expect(completedText).toHaveClass('completed');
  });

  test('deletes a task', () => {
    render(<App />);
    const taskInput = screen.getByPlaceholderText(/Add a task.../i);
    const addButton = screen.getByText(/Add Task/i);

    fireEvent.change(taskInput, { target: { value: 'Delete Me' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText('🗑');
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/Delete Me/i)).not.toBeInTheDocument();
  });
});

