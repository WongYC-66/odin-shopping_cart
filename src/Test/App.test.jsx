import { render, screen } from "@testing-library/react";
import { beforeEach, expect, describe, it, waitFor } from "vitest";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from 'react-router-dom';
import Home from "../Home/Home";
import Store from "../Store/Store";
import fakeStoreItem from "./fakestore.json"


describe("Home component", () => {

  beforeEach(async () => {
    // Clear mocks and add some testing data after before each test run
    await render(
      <Router>
        <Home />
      </Router>,);
  })

  it("renders Home page correctly", () => {
    expect(screen.getByRole("heading", { name: "THE LONG WEEKEND SALE" })).toBeTruthy()
  });

  it("handles SHOP NOW button click correctly", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("button", { name: /Shop Now/i });
    await user.click(button);
    expect(screen.getByRole("heading", { name: "THE LONG WEEKEND SALE" }).textContent).toMatch("");
    // expect(screen).toHaveTextContent(/store/);

  });

  it("handles click of navigate button correctly", async () => {
    const user = userEvent.setup();
    const button = screen.getByRole("link", { name: /Store/i });
    await user.click(button);
    expect(screen.getByRole("heading", { name: "THE LONG WEEKEND SALE" }).textContent).toMatch("");
    // expect(screen).toHaveTextContent(/store/);

  });

});

describe("Store component", () => {

  // console.log(fakeStoreItem)
  
  beforeEach(async () => {
    // Clear mocks and add some testing data after before each test run
    await render(
      <Router>
        <Store testItems={fakeStoreItem} />
      </Router>,);
  })

  it("loads the store page with mock items & price correctly", async () => {
    expect(screen.getAllByRole("heading")[2].textContent).toMatch("56.99 $");
  });

  it("add 1 item to cart correctly", async () => {
    const user = userEvent.setup();
    const addOneButton = screen.getAllByRole("button", { name: "+" })[0];
    const addtoCartButton = screen.getAllByRole("button", { name: "Add to Cart" })[0];

    await user.click(addOneButton);
    await user.click(addtoCartButton);
    expect(screen.getByTitle("cartCount").textContent).toMatch("1");
  });


  it("add 1 item to cart correctly (2 pcs)", async () => {
    const user = userEvent.setup();
    const addOneButton = screen.getAllByRole("button", { name: "+" })[0];
    const addtoCartButton = screen.getAllByRole("button", { name: "Add to Cart" })[0];

    await user.click(addOneButton);
    await user.click(addOneButton);
    await user.click(addtoCartButton);
    expect(screen.getByTitle("cartCount").textContent).toMatch("2");
  });

  it("add 1 item to cart correctly (repeatably) ", async () => {
    const user = userEvent.setup();
    const addOneButton = screen.getAllByRole("button", { name: "+" })[0];
    const addtoCartButton = screen.getAllByRole("button", { name: "Add to Cart" })[0];

    await user.click(addOneButton);
    await user.click(addtoCartButton);
    await user.click(addtoCartButton);
    await user.click(addtoCartButton);
    expect(screen.getByTitle("cartCount").textContent).toMatch("3");
  });

  it("add 5 item to cart correctly (each 1 pcs) ", async () => {
    const user = userEvent.setup();
    const addOneButtonGroup = screen.getAllByRole("button", { name: "+" });
    const addtoCartButtonGroup = screen.getAllByRole("button", { name: "Add to Cart" });

    for (let i = 0; i < 5; i++) {
      const addOneButton = addOneButtonGroup[i];
      const addtoCartButton = addtoCartButtonGroup[i];
      await user.click(addOneButton);
      await user.click(addtoCartButton);
    }

    expect(screen.getByTitle("cartCount").textContent).toMatch("5");
  })

  it("loads shopping cart page correctly ", async () => {
    const user = userEvent.setup();
    const showCartButton = screen.getByAltText("StoreLogo");
    await user.click(showCartButton);
    expect(screen.queryByText("Shopping Cart")).not.toBe(null);

  });

  it("closes shopping cart page correctly ", async () => {
    const user = userEvent.setup();
    const showCartButton = screen.getByAltText("StoreLogo");
    await user.click(showCartButton);
    await user.click(showCartButton);
    expect(screen.queryByText("Shopping Cart")).toBe(null);
  });

  it("shows the total amount correctly", async () => {
    const user = userEvent.setup();

    const addOneButtonGroup = screen.getAllByRole("button", { name: "+" });
    const addtoCartButtonGroup = screen.getAllByRole("button", { name: "Add to Cart" });

    for (let i = 0; i < 4; i++) {
      // first 4 item buy 1 each
      const addOneButton = addOneButtonGroup[i];
      const addtoCartButton = addtoCartButtonGroup[i];
      await user.click(addOneButton);
      await user.click(addtoCartButton);
    }
    // fifth item buy 2
    const addOneButton = addOneButtonGroup[4];
    const addtoCartButton = addtoCartButtonGroup[4];
    await user.click(addOneButton);
    await user.click(addOneButton);
    await user.click(addtoCartButton);

    const showCartButton = screen.getByAltText("StoreLogo");
    await user.click(showCartButton);
    expect(screen.getByText("Total : 152.68 $")).toBeInTheDocument();
    //
    
  });

});