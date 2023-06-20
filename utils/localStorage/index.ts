export const getItem = <T>(key: string) => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key) || '';
    try {
      return JSON.parse(value) as T;
    } catch (error) {
      return {} as T;
    }
  }
};

export const setItem = (key: string, value: unknown) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const deleteItem = (key: string) => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
