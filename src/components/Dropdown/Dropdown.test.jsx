import { render, screen } from "@testing-library/react";
import { Dropdown } from './Dropdown'
describe("Dropdown component", () => {
  it("should render Dropdown component correctly", () => {
    render(<Dropdown />);
    screen.debug();
  });
});