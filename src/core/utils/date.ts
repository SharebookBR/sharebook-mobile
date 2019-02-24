const getRemainingDays = (target) => {
  const now = new Date();
  target = new Date(target);

  const diff = target.getTime() - now.getTime();
  return msToDay(diff);
};

const msToDay = (ms) => {
  return Math.floor(ms / (1000 * 60 * 60 * 24));
};

export {getRemainingDays}
