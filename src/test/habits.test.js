import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import Habits from '../components/habits';

describe('habits에 대한 테스트 코드', () => {
  const habits = [
    { id: 1, name: 'study', count: 1 },
    { id: 2, name: 'sleep', count: 0 },
  ]
  let onIncrement;
  let onDecrement;
  let onDelete;
  let onAdd;
  let onReset;
  beforeEach(() => {
    onIncrement = jest.fn();
    onDecrement = jest.fn();
    onDelete = jest.fn();
    onAdd = jest.fn();
    onReset = jest.fn();
    render(<Habits
      habits={habits}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onDelete={onDelete}
      onAdd={onAdd}
      onReset={onReset}
    />)
  })

  it('스탭샷 테스트 코드', () => {
    const component = renderer.create(
      <Habits
        habits={habits}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        onDelete={onDelete}
        onAdd={onAdd}
        onReset={onReset}
      />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('habits에 대한 테스트 코드', () => {
    it('리셋버튼이 눌러졌을 때 onReset이 호출', () => {
      const handleReset = screen.getByText('Reset All');
      userEvent.click(handleReset);
      expect(onReset).toHaveBeenCalledTimes(1);
    });
    it('리셋버튼이 눌러졌을 때 onReset이 호출', () => {
      const handleReset = screen.getByText('Reset All');
      userEvent.click(handleReset);
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  })
})