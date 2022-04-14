const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const iDLength = 12;
const characterLength = 36;

export function generateId() {
  let id = '';
  for (let i = 0; i < iDLength; i += 1) {
    id += characters.charAt(Math.floor(Math.random() * characterLength));
  }

  return id;
}
