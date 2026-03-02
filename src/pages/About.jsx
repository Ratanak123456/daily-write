import { useEffect, useState } from "react";
import parse from "html-react-parser";

export default function About() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    async function fetchBlogs() {
      const response = await fetch(
        "https://blog-api.bykh.org/api/v100/blogs?pageNumber=0&pageSize=12",
      );
      const data = await response.json();
      setBlogs(data.data.content);
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    async function getUser() {
      const response = await fetch("https://blog-api.bykh.org/api/v100/users");
      const result = await response.json();
      setUser(result.data.content);
    }
    getUser();
  }, []);
  return (
    <>
      {blogs.map((blog) => (
        <div key={blog.id}>
          {blog.content}
        </div>
      ))}
    </>
  );
}
