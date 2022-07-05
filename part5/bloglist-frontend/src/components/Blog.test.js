import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blogs />", () => {
  let container;
  const user = { username: "daniel" };
  const blog = {
    author: "daniel fernandes",
    id: "1234-5678",
    likes: 2,
    title: "title mock",
    url: "www.mock.com",
  };
  const handleLike = jest.fn();
  const handleDelete = jest.fn();
  beforeEach(() => {
    container = render(
      <Blog
        key={blog.id}
        user={user}
        blog={blog}
        handleLikeButton={handleLike}
        handleDeleteButton={handleDelete}
      />
    ).container;
  });

  test("should render only title by default", () => {
    screen.findByText("title mock");
    const element = screen.queryByText("author: daniel fernandes");
    expect(element).toBeNull();
  });

  test("should render view button", () => {
    container.querySelector("button");
  });

  test("should show details", async () => {
    const user = userEvent.setup();
    const button = container.querySelector("button");
    await user.click(button);
    await screen.findByText("author: daniel fernandes");
    await screen.findByText("likes: 2");
    await screen.findByText("url: www.mock.com");
    expect;
  });

  test("should call handleLikeButton", async() => {
    const user = userEvent.setup();
    const viewButton = container.querySelector("button");
    await user.click(viewButton);
    const likeButton = await screen.findByText("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(handleLike.mock.calls).toHaveLength(2)
  })
});
