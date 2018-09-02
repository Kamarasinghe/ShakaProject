/*
  Reducers produce the state of the application
  Reducers take in two first parameters: initial state and an action
  Next state is calculated based on the action type
  Should return the initial state if no matching actions
*/

const initialState = {
  username: '',
  isAdmin: ''
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default: 
    return state;
  }
};

export default rootReducer;