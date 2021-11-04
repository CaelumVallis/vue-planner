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

export const userDefaultObject = {
  username: 'mr. undefined',
  avatar: '',
  totalPoints: 0,
  email: '',
  uid: ''
};

export const rankNames = [
  {
    points: 0,
    title: "Novice (You won't solve them... much)",
    level: 0
  },
  {
    points: 1000,
    title: "Average (You know how to learn)",
    level: 1
  },
  {
    points: 3000,
    title: "Experienced (Don't get cocky)",
    level: 2
  },
  {
    points: 5000,
    title: "Skilled (You think you're tough?)",
    level: 3
  },
  {
    points: 8000,
    title: "Adept (You'd better be good)",
    level: 4
  },
  {
    points: 13000,
    title: "Masterful (I hope you want to learn more)",
    level: 5
  },
  {
    points: 21000,
    title: "Inhuman (You are the Alpha and the Omega)",
    level: 6
  }
];