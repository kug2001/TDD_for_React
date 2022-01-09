import React from 'react';
import { screen, render } from '@testing-library/react';
import HabitAddForm from '../components/habitAddForm';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

describe('AddForm 기능 테스트 코드', () => {
  it('렌더 스냅샷 테스트', () => {
    const componet = renderer.create(<HabitAddForm onAdd={jest.fn()} />);
    expect(componet.toJSON()).toMatchSnapshot();
  })
  describe('add함수 테스트', () => {
    let onAdd;
    let input;
    let button;
    beforeEach(() => {
      onAdd = jest.fn();
      render(<HabitAddForm onAdd={onAdd} />);
      input = screen.getByPlaceholderText('Habit');
      button = screen.getByText('Add');
    })
    it('add버튼 클릭시 onAdd()에 input value를 담아서 호출', () => {
      // input에다가 원하는 습관의 이름을 타이핑 한 다음에
      userEvent.type(input, 'sleep');
      // add라는 버튼을 클릭하면
      userEvent.click(button);
      // onAdd가 input에 입력된 이름과 함께 호출되어야 함.
      expect(onAdd).toHaveBeenCalledWith('sleep');
      expect(onAdd).toHaveBeenCalledTimes(1);
    })
    it('input데이터가 없을 때 add버튼 클릭시 onAdd() 호출 안함', () => {
      // input에다가 원하는 습관의 타이핑이 없게 한다음에
      userEvent.type(input, '');
      // add라는 버튼을 클릭하면
      userEvent.click(button);
      // onAdd 호출되면 안됨
      expect(onAdd).toHaveBeenCalledTimes(0);
    })
  })

})