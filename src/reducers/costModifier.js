const costModifier = (state = 1, action) => {
  switch (action.type) {
    case 'SET_COST_MODIFIER':
      switch (action.modifier) {
        case 'UNCOMMON':
          return 1;
        case 'COMMON':
          return 0.5;
        case 'FREQUENT':
          return 0.25;
        default:
          return state;
      }
    default:
      return state;
  }
}

export default costModifier