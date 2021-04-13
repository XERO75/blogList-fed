import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';
import blogService from './services/blogs';
import loginServer from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('lsl');
  const [password, setPassword] = useState('123456');
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();

  const loginForm = () => (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username:
          <input
            type="text"
            value={username}
            name="userName"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>

        <button type="submit">login</button>
      </form>
    </div>
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginServer.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      loginServer.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong credenticals');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    // loginServer.login()
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const addBlog = async (newBlog) => {
    try {
      await blogService.addBlog(newBlog);
      const blogs = await blogService.getAll(newBlog);
      setBlogs(blogs);
      setErrorMessage(`${newBlog.title} by ${newBlog.author} is added `);
      blogFormRef.current.toggleVisibility();
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (error) {
      setErrorMessage(error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm createBlog={addBlog}></BlogForm>
    </Togglable>
  );

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      loginServer.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <span>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
          <Blog blogs={blogs} />
          {/* {blogList()} */}
        </div>
      )}
    </div>
  );
};

export default App;
