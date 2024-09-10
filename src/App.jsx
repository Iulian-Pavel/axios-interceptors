import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInterceptors';
import "./style.scss";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState({
    userId: '', id: '', title: '', body: ''
  });

  const handleInputChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    })
  }

  const sendData = async () => {
    try {
      const response = await axiosInstance.post("/posts", postData);
      console.log(`Post successful ${response.data}`);
      setData((prevData) => [response.data, ...prevData]);
    } catch (error) {
      console.log(`Error while sending data: ${error}`)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/posts");
        setData(response.data);
      } catch (error) {
        console.log(`Error while fetching data: ${error} `);
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    // it config --global user.email "you@example.com"
  // git config --global user.name "Your Name"
    fetchData();
    console.log(data);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data.map(post => (
          <div>
          <li key={post.id}>
            <p>userID: {post.userId}</p>
            <p>postID: {post.id}</p>
              <p>title: {post.title}</p>
              <p>body: {post.body}</p>
            </li>
          </div>
        ))}
      </ul>
        <input type="text" name='userId' placeholder='userID' onChange={handleInputChange} value={postData.userId}/>
        <input type="text" name='id' placeholder='ID' onChange={handleInputChange} value={postData.id}/>
        <input type="text" name='title' placeholder='title' onChange={handleInputChange} value={postData.title}/>
        <input type="text" name='body' placeholder='body' onChange={handleInputChange} value={postData.body}/>
        <button onClick={sendData}>Submit info</button>
    </div>
  );
};

export default App;
