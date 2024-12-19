const planExpiry = (x) => {
  let y = new Date(x);
  let currentDate = new Date();
  if (
    y.getFullYear().toLocaleString() ==
    currentDate.getFullYear().toLocaleString()
  ) {
    if (
      (y.getMonth() + 1).toLocaleString() ==
      (currentDate.getMonth() + 1).toLocaleString()
    ) {
      if (
        y.getDate().toLocaleString() == currentDate.getDate().toLocaleString()
      ) {
        return "Your Plan Is Expired Today";
      } else {
        return "Your Plan Is Expiring In This Month";
      }
    } else {
      return "Your Plan Is Expiring In This Year";
    }
  } else {
    return " ";
  }
};

module.exports = { planExpiry };
