import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import React from "react";
import Home from "../src/pages/index";


describe("Home", () => {
  it("is showing app name", () => {
    render(<Home />);

    const subTitle = screen.getByText(
      "Informe o valor e a moeda para conversão"
    );
    expect(subTitle).toBeInTheDocument();
  });
  it("is showing inputs", () => {
    render(<Home />);

    const valueInput = screen.getByTestId("value");
    expect(valueInput).toBeInTheDocument();

    const currencySelect = screen.getByTestId("currency");
    expect(currencySelect).toBeInTheDocument();
  });
  it("is showing converter button", () => {
    render(<Home />);

    const converterButton = screen.getByTestId("converterButton");
    expect(converterButton).toBeInTheDocument();
  });
});
