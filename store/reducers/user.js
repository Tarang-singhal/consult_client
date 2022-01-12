import { ADD_CASH, SUB_CASH, AVAILABLE_CASH, IS_ADDING_CASH, FETCH_USER_DATA, SET_AVAILABLITY } from '../actions/user';

const initialState = {
  callRate: 0,
  email: "",
  image: "https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg",
  location: "",
  name: "",
  professionName: "",
  role: "user",
  walletAmount: 0,
  availablity: {
    monday: {
      active: false,
      start: "",
      end: "",
      slotSize: 15,
      breakSize: 10
    },
    tuesday: {
      active: false,
      start: "",
      end: "",
      slotSize: 15,
      breakSize: 10
    },
    wednesday: {
      active: false,
      start: "",
      end: "",
      slotSize: 15,
      breakSize: 10
    },
    thursday: {
      active: false,
      start: "",
      end: "",
      slotSize: 15,
      breakSize: 10
    },
    friday: {
      active: false,
      start: "",
      end: "",
      slotSize: 15,
      breakSize: 10
    },
    saturday: {
      active: false,
      start: "",
      end: "",
      slotSize: 15,
      breakSize: 10
    },
    sunday: {
      active: false,
      start: "",
      end: "",
      slotSize: 15,
      breakSize: 10
    }
  }
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
        availablity: action.availablity,
        paymentHistory: action.paymentHistory
      }
    case ADD_CASH:
      return {
        ...state,
        walletAmount: state.walletAmount + Number(action.amount)
      };
    case SUB_CASH:
      return {
        ...state,
        walletAmount: state.walletAmount - action.amount
      };
    case SET_AVAILABLITY:
      return {
        ...state,
        availablity: action.availablity
      }
    default:
      return state;
  }
};
