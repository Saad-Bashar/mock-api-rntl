/* eslint-disable no-undef, import/no-extraneous-dependencies */
import { configure } from "@testing-library/react-native";

// Import Jest Native matchers
import "@testing-library/jest-native/extend-expect";

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Enable excluding hidden elements from the queries by default
configure({
  defaultIncludeHiddenElements: false,
});

// Polyfill "window.fetch" used in the React component.
import "whatwg-fetch";

// Extend Jest "expect" functionality with Testing Library assertions.
import "@testing-library/jest-dom";

global.setImmediate =
  global.setImmediate || ((fn, ...args) => global.setTimeout(fn, 0, ...args));

import { server } from "./mocks/server";

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
