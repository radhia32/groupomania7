import React, { useEffect, useState } from "react";
import axios from "axios";
import Aimer from "./Aimer";


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
         setComments(commentsResult.data.result);
    };
    getComments();
  }, []);

  const userId = localStorage.getItem("USERID");
  const userName = localStorage.getItem("NAME");
  const userLastName = localStorage.getItem("LASTNAME");
  const userRole = localStorage.getItem("ROLE");
  var date = new Date(post.createdat);
  var dateStr =
    ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
    ("00" + date.getDate()).slice(-2) + "/" +
    date.getFullYear()
  return (
        <div className="post-container">
        <div >
          <div className="post-header">
          <p>{post.description}</p>
          <p>{dateStr}</p>
          {(post.userId == userId || userRole=="admin") && <button onClick={async () => {
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
               <img className="img-post" alt="" src={post.image} />
        </div>
        <div>
    
        {comments.map((commentItem) => {
            return   <div className="comment-list" key={commentItem.commentId}>
             
                <p>{commentItem.comment}</p>
                <p>{commentItem.prenom} { commentItem.nom}</p>
            
            {(commentItem.userId == userId || userRole==="admin") && <button onClick={async () => {
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
        <div className="comment-input">      
          <input
       className="inputs-post-commentaire"
          placeholder="entrer votre commentaire"
          onChange={(e) => setComment(e.target.value)}
        />
       
    
        <button 
         className="buttoncommentaire"
        disabled={!comment} onClick={async () => {
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
        <div className="vote">

        <Aimer postId={post.postId} />
    
        </div>
        </div>
  );
};

export default Post;