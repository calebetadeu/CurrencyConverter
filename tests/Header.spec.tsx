import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "../src/components/Header";

describe("Header", () => {
  it("is showing app name", () => {
    render(<Header />);
    expect(screen.getByText("ConversorMoedas!")).toBeInTheDocument();
  });
});
