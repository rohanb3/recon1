import { pickNotEmptyFields } from '@/services/repositoryUtils';

describe('pickNotEmptyFields', () => {
  it('should return empty object if no data passed', async () => {
    expect(pickNotEmptyFields()).toEqual({});
  });

  it('should filter not empty fields', async () => {
    const data = {
      name: 'Dmitry',
      age: null,
    };

    const expectedData = {
      name: 'Dmitry',
    };

    expect(pickNotEmptyFields(data)).toEqual(expectedData);
  });

  it('should not ignore 0', async () => {
    const data = {
      name: 'Dmitry',
      age: 0,
      home: null,
    };

    const expectedData = {
      name: 'Dmitry',
      age: 0,
    };

    expect(pickNotEmptyFields(data)).toEqual(expectedData);
  });
});
