const initialState = {
  user: null,
  uid: null,
  states: [],
  loading: false,
  checkingEmail: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_EMAIL_PENDING":
      return {
        ...state,
        checkingEmail: true,
      };
    case "CHECK_EMAIL_SUCCESS":
    case "CHECK_EMAIL_REJECTED":
      return {
        ...state,
        checkingEmail: false,
      };
    case "FETCH_STATES_SUCCESS":
      return {
        ...state,
        states: action.payload,
      };
    case "SIGN_IN_PENDING":
    case "SIGN_UP_PENDING":
      return {
        ...state,
        loading: true,
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        uid: action.payload.uid,
        loading: false,
      };

    case "SIGN_UP_SUCCESS":
    case "SIGN_IN_REJECTED":
    case "SIGN_UP_REJECTED":
      return {
        ...state,
        loading: false,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        user: null,
        uid: null,
      };
    default:
      return state;
  }
};

export default authReducer;
