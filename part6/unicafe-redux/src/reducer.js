import deepFreeze from 'deep-freeze'

const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      // Return a new state object with the updated count
      return { ...state, good: state.good +  1 };
    case 'OK':
      // Return a new state object with the updated count
      return { ...state, ok: state.ok +  1 };
    case 'BAD':
      // Return a new state object with the updated count
      return { ...state, bad: state.bad +  1 };
    case 'ZERO':
      // Reset all counts to zero
      return { ...initialState };
    default:
      // Return the current state if the action is not recognized
      return state;
  }
  
}

export default counterReducer
