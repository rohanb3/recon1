function getFirstLetter(str) {
  return str && str.split ? str.split('')[0] : '';
}

// eslint-disable-next-line import/prefer-default-export
export default function initials(userFullName) {
  const [firstName, lastName] = userFullName.split(' ');
  return `${getFirstLetter(firstName)}${getFirstLetter(lastName)}`;
}
