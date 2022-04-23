import React, { useEffect, useState } from "react";
import axios from "axios";

const Post = ({ post, setPosts , posts}) => {

  const [comment, setComment] = useState("");

  const [comments, setComments ]= useState([]);

  useEffect(() => {
    const getComments = async () => {
      const commentsResult = await axios.get(`http://localhost:4000/api/comment/${post.postId}/allcomments`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("TOKEN")}`
        }
      });
      console.log("postResult", commentsResult);
      setComments(commentsResult.data.result);
    };
    getComments();
  }, []);
console.log("comments", comments)
  const userId = localStorage.getItem("USERID");
  const userName = localStorage.getItem("NAME");
  const userLastName = localStorage.getItem("LASTNAME");
  return (
        <div>
        <div style={{ display: 'flex'}}>
          <p>{post.description}</p>
          {post.userId == userId && <button onClick={async () => {
                const result = await axios.delete(
                  "http://localhost:4000/api/post/" + post.postId,{ headers: {
                    authorization: `bearer ${localStorage.getItem("TOKEN")}`
                  }}
                );

                console.log("result", result);
                const filtredPosts = posts.filter(
                  (postItem) => postItem.postId !== post.postId
                );
                setPosts(filtredPosts);
              }}>delete</button>}
          
        </div>
        <div>

        {comments.map((commentItem) => {
            return <div>
            <div style={{ display: "flex", justifyContent: 'center'}}>
                <p>{commentItem.comment}</p>
                <p>{commentItem.prenom} { commentItem.nom}</p>
            </div>
            {commentItem.userId == userId && <button onClick={async () => {
                const result = await axios.delete(
                  "http://localhost:4000/api/comment/" + commentItem.commentId,{ headers: {
                    authorization: `bearer ${localStorage.getItem("TOKEN")}`
                  }}
                );

                console.log("result", result);
                const filtredComments = comments.filter(
                  (commentElement) => commentElement.commentId !== commentItem.commentId
                );
                setComments(filtredComments);
              }}>delete</button>}
            </div>
        })}
        </div>
        <div style={{ display: 'flex'}}>        <input
          placeholder="entrer votre commentaire"
          onChange={(e) => setComment(e.target.value)}
        />
        <button disabled={!comment} onClick={async () => {
            if(comment) {
                const newComment= await axios.post(
                 "http://localhost:4000/api/comment",
                 {
                   comment,
                   postId: post.postId
                         },
                 {
                   headers: {
                     authorization: `bearer ${localStorage.getItem("TOKEN")}`
                   }
                 }
               );
               setComment("")
               console.log("newPost", newComment.data); 
               const newAddedComment = { comment,commentId: newComment.data.insertId,userId , postId: post.postId, nom: userLastName, prenom: userName};

               setComments([...comments, newAddedComment])

            }
        }}>commenter</button>
        </div>
        </div>
  );
};

export default Post;