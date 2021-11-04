export const modalConstants = {
    taskType: {
      completed: 'Completed',
      pointsOfTotal: 'Points / total',
      pointsOfTotalForTime: 'Points / total for X',
    },
    titles: {
      addMode: {
        modalTitle: 'Add new task',
        buttonTitle: 'Add task',
      },
      editMode: {
        modalTitle: 'Edit task',
        buttonTitle: 'Save changes',
      }
    }
};

export const taskDefaultObject = {
  title: '',
  taskType: '',
  currentPoints: null,
  totalPoints: null,
  pointValue: null,
  pointName: '',
  completed: false,
  imageUrl: ''
};

export const API_KEY = 'e4ca8e74b9ce1d7d81d543944f39117c';