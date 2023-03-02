/* eslint-disable @typescript-eslint/no-explicit-any */
export const getItem = (key: string) => {
  if (typeof window !== 'undefined') {
    const value = sessionStorage.getItem(key) || '';
    try {
      return JSON.parse(value);
    } catch (error) {
      return '';
    }
  }
};

export const setItem = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const deleteItem = (key: string) => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(key);
  }
};
