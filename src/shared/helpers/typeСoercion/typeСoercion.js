export function typeСoercion(data) {
  return {
    ...data,
    roles: typeof data.roles === 'string' ? [data.roles] : data.roles,
    mathScore: Number(data.mathScore),
    universityAverageScore: Number(data.universityAverageScore),
  };
}
