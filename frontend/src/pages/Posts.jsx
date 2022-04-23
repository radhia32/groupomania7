import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from '../components/Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [description, setDescription] = useState("");
  useEffect(() => {
    const getPosts = async () => {
      const postsResult = await axios.get("http://localhost:4000/api/post", {
        headers: {
          authorization: `bearer ${localStorage.getItem("TOKEN")}`
        }
      });
      console.log("postResult", postsResult);
      setPosts(postsResult.data.result);
    };
    getPosts();
  }, []);

  const userId = localStorage.getItem("USERID");
  return (
    <div className="app">
      <div>
        <input
          placeholder="entrer votre nouvelle publication"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={async () => {
            if (description) {
              const newPost = await axios.post(
                "http://localhost:4000/api/post",
                {
                  description
                },
                {
                  headers: {
                    authorization: `bearer ${localStorage.getItem("TOKEN")}`
                  }
                }
              );
              console.log("newPost", newPost.data);
              // creation d'un objet dedans on a mis la description saisie et l'id de la
              // nouvelle pub ajoutée, cet objet sera ajouter dans le tableau posts
              // pour l'affiché avec tous les publication
              const newAddedPost = { description,postId: newPost.data.post.insertId,userId };

              setPosts([...posts, newAddedPost]);
              setDescription("");
              // ajouter le nouveau element ajouté dans le tableau
              // ajout d'un nouveau element dans un tableau [...prevTable, newAddedElement]
            }
          }}
        >
          partager
        </button>
      </div>
      {posts?.map((post) => (
        <Post post={post} posts={posts} setPosts={setPosts}/>

      ))}
    </div>
  );
};

export default Posts;