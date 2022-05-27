const totalLikes = (blogs) => {
  const blogsSum = (sum, blog) => sum + blog.likes;
  return blogs.reduce(blogsSum, 0);
};

const favoriteBlog = (blogs) => {
  const mostLiked = (mostLikes, blog) =>
    mostLikes > blog.likes ? mostLikes : blog;
  return blogs.reduce(mostLiked, 0);
};

const mostBlogs = (blogs) => {
  const authors = {};
  blogs.forEach((blog) => {
    if (authors[blog.author] === undefined) {
      authors[blog.author] = 1;
    } else {
      authors[blog.author]++;
    }
  });
  const authorWithMostBlogs = Object.keys(authors).reduce(
    (authorWithMostBlogs, author) =>
      authors[author] > authors[authorWithMostBlogs]
        ? author
        : authorWithMostBlogs
  );
  return {
    author: authorWithMostBlogs,
    blogs: authors[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  const authors = {};
  blogs.forEach((blog) => {
    if (authors[blog.author] === undefined) {
      authors[blog.author] = blog.likes;
    } else {
      authors[blog.author] += blog.likes;
    }
  });
  const authorWithMostLikes = Object.keys(authors).reduce(
    (authorWithMostLikes, author) =>
      authors[author] > authors[authorWithMostLikes]
        ? author
        : authorWithMostLikes
  );
  return {
    author: authorWithMostLikes,
    likes: authors[authorWithMostLikes],
  };
};

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes };
