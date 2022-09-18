import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewBlog from "./NewBlog";

describe("<NewBlog />", () => {
  let container;
  const mockHandler = jest.fn();
  beforeEach(() => {
    container = render(<NewBlog handleAddBlog={mockHandler} />).container;
  });

  test("should render new blog form", () => {
    screen.findByText("new blog:");
  });

  test("should add new blog with the right props", async () => {
    const user = userEvent.setup();
    const input = screen.getAllByRole("textbox");
    const sendButton = container.querySelector("button");
    await user.type(input[0], "mock title");
    await user.type(input[1], "mock name");
    await user.type(input[2], "www.mock.com");
    await user.click(sendButton);
    expect(mockHandler.mock.calls).toHaveLength(1);
    expect(mockHandler).toHaveBeenCalledWith(
      { author: "mock name", title: "mock title", url: "www.mock.com" },
    );
  });
});
