export function getFullName(name, lastName) {
  return name || lastName ? `${name} ${lastName}` : undefined;
}
