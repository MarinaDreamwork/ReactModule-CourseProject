export function generateAuthErrors(message) {
  switch (message) {
    case 'EMAIL_NOT_FOUND':
      return 'EMAIL не существует в системе';
    case 'INVALID_PASSWORD':
      return 'Пароль неверный';
  }
};
