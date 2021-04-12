import React from 'react';
import Togglable from './Togglable';

const Blog = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
  <div >
    {blogs.map((blog) => (
      <div key={blog.id} style={blogStyle}>
        {blog.title} {blog.author}
        <Togglable buttonLabel="view" >
          <div>{blog.url}</div> 
          <div>{blog.likes}</div> 
          <div>{blog.author}</div> 
        </Togglable>
      </div>
    ))}
  </div>
  )
}
  

export default Blog;
