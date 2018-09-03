/*
  'Dispatch an action' in order to change the state
  Actions require a 'type' property to describe how to change state
  An action can take in a 'payload' which is potentially what is going to be
  added/changed in the state
*/

export const getMessages = (messages) => ({
  type: 'GET_MESSAGES', 
  payload: messages
});