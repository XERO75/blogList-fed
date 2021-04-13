import React from 'react';
import Togglable from './Togglable';
import blogService from '../services/blogs';

const Blog = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = async (blog) => {
    const params = {
      ...blog,
      likes: blog.likes ? ++blog.likes : 1,
    };
    await blogService.addLike(params);
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Removing ${blog.title} by ${blog.author} `)) {
      const res = await blogService.deleteBlog(blog);
      return res.data;
    }
  };

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id} style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={() => handleDelete(blog)}>delete</button>
            <Togglable buttonLabel="view">
              <div>{blog.url}</div>
              <div>{blog.likes}</div>
              <button onClick={() => handleLike(blog)}>like</button>
              <div>{blog.author}</div>
            </Togglable>
          </div>
        ))}
    </div>
  );
};

export default Blog;
