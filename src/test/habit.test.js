import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Habit from '../components/habit';

describe('habit 컴포넌트에 대한 테스트 코드', () => {
  const habit = { id: 1, name: 'sleep', count: 0 };
  let onIncrement;
  let onDecrement;
  let onDelete;
  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    render(<Habit habit={habit} onIncrement={onIncrement} onDecrement={onDecrement} onDelete={onDelete} />);
  })
  it('habit 컴포넌트 스냅샷 테스트', () => {
    const component = renderer.create(<Habit habit={habit} onIncrement={onIncrement} onDecrement={onDecrement} onDelete={onDelete} />);
    expect(component.toJSON()).toMatchSnapshot();
  })
  describe('habit 컴포넌트 테스트', () => {
    it('increase', () => {
      const handleIncrement = screen.getByTestId('increase');
      userEvent.click(handleIncrement);
      checkPropsFunctions(onIncrement, habit);
    })
    it('decrease', () => {
      const handleDecrement = screen.getByTestId('decrease');
      userEvent.click(handleDecrement);
      checkPropsFunctions(onDecrement, habit);
    })
    it('delete', () => {
      const handleDelete = screen.getByTestId('delete');
      userEvent.click(handleDelete);
      checkPropsFunctions(onDelete, habit);
    })
    function checkPropsFunctions(fn, habit) {
      expect(fn).toHaveBeenCalledTimes(1);
      expect(fn).toHaveBeenCalledWith(habit);
    }
  });
})

