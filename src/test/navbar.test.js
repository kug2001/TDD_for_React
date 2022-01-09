import React from 'react';
import { screen, render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Navbar from '../components/navbar';

describe('habits에 대한 테스트 코드', () => {

  it('스냅샷 테스트', () => {
    const component = renderer.create(<Navbar />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  describe('navbar에 테스트 코드', () => {
    it('total 카운트 0표기 확인', () => {
      render(<Navbar totalCount={0} />);
      const count = screen.getByTestId('total-count');
      expect(count.textContent).toBe("0");
    });
    it('total 카운트 99 표기 확인', () => {
      render(<Navbar totalCount={99} />);
      const count = screen.getByTestId('total-count');
      expect(count.textContent).toBe("99");
    });
  })
})