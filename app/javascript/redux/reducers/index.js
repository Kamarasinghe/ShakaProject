/*
  Reducers produce the state of the application
  Reducers take in two first parameters: initial state and an action
  Next state is calculated based on the action type
  Should return the initial state if no matching actions
*/

const initialState = {
  isAdmin: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MESSAGES': 
      return { ...state, messages: action.payload };
    default: 
    return state;
  }
};

export default rootReducer;