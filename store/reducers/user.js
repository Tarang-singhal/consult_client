import { ADD_CASH, SUB_CASH, AVAILABLE_CASH, IS_ADDING_CASH, FETCH_USER_DATA } from '../actions/user';

const initialState = {
  callRate: 0,
  email: "",
  image: "https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
  location: "",
  name: "",
  professionName: "",
  role: "user",
  walletAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DATA:
      return {
        ...state,
        callRate: action.callRate,
        email: action.email,
        image: action.image,
        location: action.location,
        name: action.name,
        professionName: action.professionName,
        role: action.role,
        walletAmount: action.walletAmount,
      }
    case ADD_CASH:
      return {
        ...initialState,
        walletAmount: state.walletAmount + Number(action.amount)
      };
    case SUB_CASH:
      return {
        ...initialState,
        walletAmount: state.walletAmount - action.amount
      };
    default:
      return state;
  }
};
