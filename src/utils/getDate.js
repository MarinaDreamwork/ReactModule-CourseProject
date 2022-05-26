export const getDate = (miliseconds) => {
  const date = Date.now();
  const commentsTime = new Date(Number(miliseconds));
  const differenceTimeFromNow = date - commentsTime;
  let minutes = Math.round(differenceTimeFromNow / (1000 * 60));
  let hours = differenceTimeFromNow / (1000 * 60 * 60);
  const day = (new Date(Number(miliseconds))).getDate();
  const month = (new Date(Number(miliseconds))).getMonth();
  const year = (new Date(Number(miliseconds))).getFullYear();
  const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  if (minutes < 1) {
    return '1 минуту назад';
  } else if (minutes < 5) {
    return '5 минут назад';
  } else if (minutes < 10) {
    return '10 минут назад';
  } else if (minutes < 30) {
    return '30 минут назад';
  } else if (minutes < 90) {
    if (hours < 1) {
      return minutes + ' минут назад';
    } else {
      hours = Math.round(hours);
      minutes = minutes - hours * 60;
      return `${hours} ч. ${minutes} мин. назад`;
    };
  } else if (minutes < 525600) {
    return `${day} ${months[month]}`;
  } else {
    return `${day} ${months[month]} ${year}`;
  }
};
