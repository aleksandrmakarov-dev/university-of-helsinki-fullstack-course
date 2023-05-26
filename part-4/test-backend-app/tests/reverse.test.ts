const reverseFunc = require('../utils/for_testing').reverse;

test('reverse of a', () => {
  const result = reverseFunc('a');

  expect(result).toBe('a');
});

test('reverse of react', () => {
  const result = reverseFunc('react');

  expect(result).toBe('tcaer');
});

test('reverse of releveler', () => {
  const result = reverseFunc('releveler');

  expect(result).toBe('releveler');
});
