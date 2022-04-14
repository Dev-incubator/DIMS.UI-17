export function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString.split('-').join(','));
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}
