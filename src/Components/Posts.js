import { useState, useEffect } from "react";
import { BACKEND_URL, USERID } from "../Constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

import { PlusCircleFill } from "react-bootstrap-icons";

export default function Posts() {
  const [allPost, setAllPost] = useState([]);

  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPost();
  }, []);
  const getAllPost = async () => {
    const posts = await axios.get(`${BACKEND_URL}/users/${USERID}/posts/`);
    // console.log(posts.data);
    setAllPost(posts.data);
  };

  const goToPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const displayPosts = () => {
    return allPost.map((post) => (
      <Carousel.Item
        key={post.id}
        onClick={() => {
          goToPost(post.id);
        }}
      >
        <Carousel.Caption>
          <h2 className="large bold">{post.title}</h2>
          <h3 className="medium">{post.content}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    ));
  };

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Note: authenticated users see a summary of pet profiles */}

        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          controls={allPost.length > 1}
          indicators={allPost.length > 1}
        >
          {displayPosts()}
        </Carousel>

        <div className="bottom-btn-container">
          <PlusCircleFill
            className="custom-btn"
            onClick={() => {
              navigate("/postform");
            }}
          />
        </div>
      </header>
    </div>
  );
}
