const expiryDate = (x) => {
  let expiry = new Date(x);
  // expiryDate.setHours(0,0,0,0)

  let today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffInTime = expiry.getTime() - today.getTime();
  const diffInDay = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

  if (diffInDay > 0 && diffInDay <= 2) {
    return `Your Plan is Expiring Soon on ${expiry.toDateString()}`;
  } else if (diffInDay <= 0) {
    return "Your Plan Is Expired";
  } else  {
    return ""
  }
};

module.exports = { expiryDate };
