// index.test.ts
import { describe, expect, test } from "@jest/globals";
import { sum, subtract, multiply, divide, power } from "./index";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("subtracts 5 - 3 to equal 2", () => {
    expect(subtract(5, 3)).toBe(2);
  });

  test("multiplies 4 * 3 to equal 12", () => {
    expect(multiply(4, 3)).toBe(12);
  });

  test("divides 10 / 2 to equal 5", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("throws error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });

  test("calculates power of 2^3 to equal 8", () => {
    expect(power(2, 3)).toBe(8);
  });
});
