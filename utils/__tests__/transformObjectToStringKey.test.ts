import { transformObjectToStringKey } from '../transformObjectToStringKey';

describe('utils/transformObjectToStringKey', () => {
  it('transform simple object', () => {
    const result = transformObjectToStringKey({ config: { value: 1 } });
    expect(result).toStrictEqual({ 'config.value': 1 });
  });

  it('transform nested object', () => {
    const result = transformObjectToStringKey({ cloud: { config: { value: 1 } } });
    expect(result).toStrictEqual({ 'cloud.config.value': 1 });
  });

  it('transform complex object', () => {
    const result = transformObjectToStringKey({
      cloud: { config: { value: 1, label: 'label' }, test: 1 },
    });
    expect(result).toStrictEqual({
      'cloud.config.value': 1,
      'cloud.config.label': 'label',
      'cloud.test': 1,
    });
  });
});
