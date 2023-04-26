import { useState, useEffect } from "react";
import { axiosDefault } from "../Axios.js";
import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import useUser from "../Hooks/useUser.js";

export default function Posts() {
  const [postDetails, setPostDetails] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [content, setNewContent] = useState("");
  let { postId } = useParams();
  const { user } = useUser();

  useEffect(() => {
    getSinglePost();
    getAllComments();
  }, []);

  const getSinglePost = async () => {
    const posts = await axiosDefault.get(
      // `${BACKEND_URL}/users/${USERID}/posts/postId/${postId}`
      `/users/${user?.id}/posts/postId/${postId}`
    );
    setPostDetails(posts.data);
  };

  const getAllComments = async () => {
    const comments = await axiosDefault.get(
      `/users/${user?.id}/posts/postId/${postId}/comments`
    );

    let listOfComments = (
      <div>
        comments:
        {comments.data.map((comments, index) => (
          <div className="media" key={index}>
            <div className="media-body">
              <p>
                {comments.user.username} : {comments.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    );

    setAllComments(listOfComments);
  };

  const handleChange = (e) => {
    setNewContent(e.target.value);
  };

  const addComment = async (e) => {
    e.preventDefault();
    await axiosDefault
      .post(`/users/${user?.id}/posts/${postId}/addComments`, {
        content,
      })
      .then(getAllComments())
      .then(setNewContent(""));

    // .then(changeList());
  };

  // let listOfComments = (
  //   <div>
  //     comments:
  //     {allComments.map((comments, index) => (
  //       <div className="media" key={index}>
  //         <div className="media-body">
  //           <p>
  //             {comments.user.username} : {comments.content}
  //           </p>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );

  // const changeList = () => {
  //   listOfComments = (
  //     <div>
  //       {allComments.map((comments) => (
  //         <Card style={{ width: "18rem", color: "black", cursor: "pointer" }}>
  //           <Card.Body>
  //             <Card.Title>{comments.content}</Card.Title>
  //           </Card.Body>
  //         </Card>
  //       ))}
  //     </div>
  //   );
  // };

  return (
    <div className="App">
      <header className="App-header">
        {/* Note: authenticated users see a summary of pet profiles */}
        <p>Title : {postDetails.title}</p>
        <p>content : {postDetails.content}</p>

        <div>
          {/* {listOfComments} */}
          {allComments}
          {/* {allComments.map((comments) => (
            <Card style={{ width: "18rem", color: "black", cursor: "pointer" }}>
              <Card.Body>
                <Card.Title>{comments.content}</Card.Title>
              </Card.Body>
            </Card>
          ))} */}
        </div>
        {user.username && (
          <Form onSubmit={addComment}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                value={content}
                onChange={handleChange}
                placeholder="Enter comment"
              />{" "}
              <Button variant="primary" type="submit">
                Comment
              </Button>
            </Form.Group>
          </Form>
        )}
      </header>
    </div>
  );
}
