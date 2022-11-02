import { useApolloClient, useQuery, useSubscription } from "@apollo/client";
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import BooksRecommend from "./components/BooksRecommend";
import LoginForm from "./components/LoginForm";
import Message from "./components/Message";
import NewBook from "./components/NewBook";
import { ALL_BOOKS, ME } from "./services/library-graphql-queries";
import { BOOK_ADDED } from "./services/library-graphql-subscriptions";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState({});
  const client = useApolloClient();
  const user = useQuery(ME);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    localToken = null;
  };

  const notify = (message) => {
    setNotification({
      type: "error",
      message: message,
    });
    setTimeout(() => {
      setNotification({});
    }, 3000);
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      notify(`${addedBook.title} added`);

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        };
      });
    },
  });

  let localToken = localStorage.getItem("library-user-token", token);

  if (!token && !localToken)
    return (
      <>
        <Message notification={notification} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </>
    );

  if (user.loading) return null;

  return (
    <div>
      <Message notification={notification} />
      <div style={{ display: "flex" }}>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("recommend")}>recommend</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={logout} style={{ marginLeft: "auto" }}>
          logout
        </button>
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <BooksRecommend show={page === "recommend"} user={user} />
      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
