const costModifier = (state = 1, action) => {
  switch (action.type) {
    case 'SET_COST_MODIFIER':
      return action.modifier;
    default:
      return state;
  }
}

export default costModifier