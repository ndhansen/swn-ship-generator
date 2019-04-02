function formatCost(cost) {
  if (cost >= 1000 && cost < 1000000) {
    let costStr = cost.toString();
    costStr = costStr.substr(-3, 3);
    if (costStr === "000") {
      return (cost / 1000) + " k";
    }
    else { return cost; }
  }
  else if (cost >= 1000000) {
    let costStr = cost.toString();
    costStr = costStr.substr(-3, 3);
    if (costStr === "000") {
      return (cost / 1000000) + " m";
    }
    else { return cost; }
  }
  else {
    return cost;
  }
}

export default formatCost;