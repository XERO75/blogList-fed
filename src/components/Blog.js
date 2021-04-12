import React from 'react';
const Blog = ({ blogs }) => (
  <div>
    {blogs.map((blog) => (
      <div key={blog.id}>
        {blog.title} {blog.author}
      </div>
    ))}
  </div>
);

export default Blog;
