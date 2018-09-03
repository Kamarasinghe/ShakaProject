/*
  Reducers produce the state of the application
  Reducers take in two first parameters: initial state and an action
  Next state is calculated based on the action type
  Should return the initial state if no matching actions
*/

const initialState = {
  isAdmin: false,
  signedIn: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MESSAGES': 
      return { ...state, messages: action.payload };
    case 'SIGN_IN':
      return { ...state, signedIn: action.payload.username, isAdmin: action.payload.isAdmin };
    case 'SIGN_OUT':
      return { ...state, signedIn: '', isAdmin: false }
    default: 
    return state;
  }
};

export default rootReducer;