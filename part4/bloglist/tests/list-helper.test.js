const listHelper = require("../utils/list-helper");

const listWithOneBlog = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 5,
  },
];
const listWithThreeBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Daniel Lo Nigro",
    likes: 2,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Daniel Lo Nigro",
    likes: 6,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    likes: 5,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Vanessa Paradis",
    likes: 7,
  },
];

describe("totalLikes", () => {
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has only more than one blog, should sum all likes", () => {
    const result = listHelper.totalLikes(listWithThreeBlogs);
    expect(result).toBe(20);
  });

  test("when list is empty, should return zero", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });
});

describe("favoriteBlog", () => {
  test("when list has only one blog, should return that blog", () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toEqual(listWithOneBlog[0]);
  });

  test("when list has more than one blog, should return the blog with most likes", () => {
    const result = listHelper.favoriteBlog(listWithThreeBlogs);
    expect(result).toEqual(listWithThreeBlogs[3]);
  });
});

describe("mostBlogs", () => {
  test("when list has only one blog, should return that blog", () => {
    const result = listHelper.mostBlogs(listWithOneBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 });
  });
  test("when list has only one blog, should return that blog", () => {
    const result = listHelper.mostBlogs(listWithThreeBlogs);
    expect(result).toEqual({ author: "Daniel Lo Nigro", blogs: 2 });
  });
});

describe("mostLikes", () => {
  test("when list has only one blog, should return that blog", () => {
    const result = listHelper.mostLikes(listWithOneBlog);
    expect(result).toEqual({ author: "Edsger W. Dijkstra", likes: 5 });
  });
  test("when list has only one blog, should return that blog", () => {
    const result = listHelper.mostLikes(listWithThreeBlogs);
    expect(result).toEqual({ author: "Daniel Lo Nigro", likes: 8 });
  });
});
