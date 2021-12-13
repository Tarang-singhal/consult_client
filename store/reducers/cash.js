import { ADD_CASH, SUB_CASH, AVAILABLE_CASH, IS_ADDING_CASH } from '../actions/cash';

const initialState = {
  cash: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CASH:
      return {
          ...initialState,
        cash: state.cash + action.cash
      };
    case SUB_CASH:
      return {
          ...initialState,
        cash: state.cash - action.cash
      };
    case AVAILABLE_CASH:
      return {
        ...initialState,
        cash
      };
    // case SIGNUP:
    //   return {
    //     token: action.token,
    //     userId: action.userId
    //   };
    default:
      return state;
  }
};
