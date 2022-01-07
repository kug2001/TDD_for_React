import HabitPresenter from '../api/habit_presenter.js';

describe('HabitPresenter', () => {
  const habits = [
    { id: 1, name: 'young', count: 1 },
    { id: 2, name: 'jayden', count: 0 },
  ];
  let presenter;
  let update;
  beforeEach(() => {
    presenter = new HabitPresenter(habits, 3);
    update = jest.fn();
  });

  it('초기화 테스트', () => {
    expect(presenter.getHabits()).toBe(habits);
  });

  it('increment기능 테스트', () => {
    presenter.increment(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(2);
    checkUpdateIsCalled(1)
  });

  it('decrement기능 테스트', () => {
    presenter.decrement(habits[0], update);
    expect(presenter.getHabits()[0].count).toBe(0);
    checkUpdateIsCalled(1);
  });

  it('decrement가 0이하로 내려가지 않는 기능 테스트', () => {
    presenter.decrement(habits[1], update);
    expect(presenter.getHabits()[1].count).toBe(0);
    checkUpdateIsCalled(1);
  });

  it('delete 기능 테스트', () => {
    presenter.delete(habits[0], update);
    expect(presenter.getHabits().length).toBe(1);
    expect(presenter.getHabits()).toEqual([habits[1]]);
    checkUpdateIsCalled(1);
  });

  it('add 기능 테스트', () => {
    presenter.add('jerry', update);
    expect(presenter.getHabits().length).toBe(3);
    expect(presenter.getHabits()[2].name).toBe('jerry');
    expect(presenter.getHabits()[2].count).toBe(0);
    checkUpdateIsCalled(1);
  });

  it('add 에러기능 테스트', () => {
    presenter.add('jerry', update);
    expect(() => { presenter.add('age', update) }).toThrow(`습관의 갯수는 3 이상이 될 수 없습니다.`);
    expect(presenter.getHabits().length).toBe(3);
    checkUpdateIsCalled(1);
  });

  it('reset 기능 테스트', () => {
    presenter.reset(update);
    expect(presenter.getHabits().length).toBe(habits.length);
    expect(presenter.getHabits()[0].count).toBe(0);
    expect(presenter.getHabits()[1].count).toBe(0);
    checkUpdateIsCalled(1);
  });

  it('0이 아닌 아이들만 reset 기능 테스트', () => {
    const habits = presenter.getHabits();
    presenter.reset(update);
    const updateHabits = presenter.getHabits();
    expect(updateHabits[1]).toBe(habits[1]);  //오브젝트의 참조값을 가져온다. 불변성을 지켜줘 리엑트가 불필요한 렌더링이 되지 않도록 한다.
  });

  function checkUpdateIsCalled(num) {
    expect(update).toHaveBeenCalledTimes(num);
    expect(update).toHaveBeenLastCalledWith(presenter.getHabits());
  }
})