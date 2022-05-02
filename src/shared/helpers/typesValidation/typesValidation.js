export function typesValidation(data) {
  return {
    ...data,
    roles: isString(data.roles) ? [data.roles] : data.roles,
    mathScore: isNumber(data.mathScore) ? data.mathScore : Number(data.mathScore),
    universityAverageScore: isNumber(data.universityAverageScore)
      ? data.universityAverageScore
      : Number(data.universityAverageScore),
  };
}

function isString(value) {
  return typeof value === 'string';
}

function isNumber(value) {
  return typeof value === 'number';
}
