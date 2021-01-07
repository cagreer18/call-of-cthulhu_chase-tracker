import * as sanitizer from "../lib/sanitizer";

const padding = "   ";

test("removes trailing and leading whitespace", () => {
  const expected = "TEST";
  const paddedString = padding + expected + padding;

  const actual = sanitizer.sanitize(paddedString);

  expect(actual).toBe(expected);
});

test("removes any non-alphanumeric characters excluding dashes and underscores", () => {
  const specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
  const unsanitizedString = "Some" + specialCharacters + "String";

  const actual = sanitizer.sanitize(unsanitizedString);
  const expected = "Some-_String";

  expect(actual).toBe(expected);
});