export const parseJSON = (value: string) => {
  try {
    return {
      value: JSON.parse(value),
      isValid: true,
    };
  } catch (e) {
    return {
      value,
      isValid: false,
    };
  }
};
