import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import App from "./App";

test("should render the success message", async () => {
  render(<App />);
  const FeedbackInput = screen.getByPlaceholderText("Your feedback");
  const submitButton = screen.getByText("Submit");
  fireEvent.changeText(FeedbackInput, "This is a test from jest");
  fireEvent.press(submitButton);

  expect(await screen.findByText("Thank you for your feedback!")).toBeTruthy();
});
