export const REGEXP_KEYS = {
  email: /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
  phone: /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i,
  numbers: /^[0-9,.]+$/i,
};
