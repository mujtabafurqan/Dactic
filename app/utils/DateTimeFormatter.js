export const formatStringTime = (time, hourFormat) => {
  const dateToday = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
  }).format(Date.now());
  const dateOfQuery = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
  }).format(new Date(time));
  if (dateOfQuery === dateToday && hourFormat === 12) {
    return new Intl.DateTimeFormat('en-GB', {
      timeStyle: 'short',
      hour12: true,
    }).format(new Date(time));
  }
  if (dateOfQuery === dateToday && hourFormat === 24) {
    return new Intl.DateTimeFormat('en-GB', {
      timeStyle: 'short',
    }).format(new Date(time));
  }
  const options = {
    month: 'short',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(time));
};

export const timeDiffInHours = time => {
  const diffinMS = Date.now() - new Date(time);
  const timeToAnswer = 24 - Math.floor(diffinMS / (1000 * 60 * 60));
  if (timeToAnswer > 0) {
    return `${timeToAnswer} hrs`;
  }

  return `${Math.abs(timeToAnswer)} hrs Overdue`;
};
