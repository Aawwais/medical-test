const initialState = {
  tests: [],
  lastVisible: null,
  hasMore: true,
};

const testsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_TEST":
      return {
        ...state,
        tests: [...state.tests, action.payload],
      };
    case "FETCH_ALL_TESTS":
      return {
        ...state,
        tests: action.payload.tests,
        lastVisible: action.payload.lastVisible,
        hasMore: action.payload.hasMore,
      };
    case "LOAD_MORE_TESTS":
      return {
        ...state,
        tests: [...state.tests, ...action.payload.tests],
        lastVisible: action.payload.lastVisible,
        hasMore: action.payload.hasMore,
      };
    case "UPDATE_TEST":
      return {
        ...state,
        tests: state.tests.map((test) =>
          test.uid === action.payload.id ? action.payload : test
        ),
      };
    case "DELETE_TEST":
      return {
        ...state,
        tests: state.tests.filter((test) => test.uid !== action.payload),
      };
    default:
      return state;
  }
};

export default testsReducer;
