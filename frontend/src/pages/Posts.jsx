import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from '../components/Post';
import Header from '../components/Header';
import Auth from "../components/Auth";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  useEffect(() => {
    const getPosts = async () => {
      const postsResult = await axios.get("http://localhost:4000/api/post", {
        headers: {
          authorization: `bearer ${localStorage.getItem("TOKEN")}`
        }
      });
      setPosts(postsResult.data.result);
    };
    getPosts();
  }, []);

  const onChangeImage = (e) => setFile(e.target.files[0]);

  const userId = localStorage.getItem("USERID");
  if(!userId) {
    return <Auth />
  }
  return (
    <div>
      <Header />
      <div className="new-post">
        <div className="inputs-post-container">
         
        <input
        id="desc"
          className='inputForm'
          placeholder="entrer votre nouvelle publication"
          onChange={(e) => setDescription(e.target.value)}
        />
        
         <input id="file" type={"file"}
            onChange={onChangeImage}
        />
        </div>
        <button
        className="share-button"
          onClick={async () => {
            if (description) {
              const formData = new FormData();
              formData.append('description', description);
              formData.append('file', file);
              const newPost = await axios.post(
                "http://localhost:4000/api/post",
             formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: `bearer ${localStorage.getItem("TOKEN")}`
                  }
                }
              );
      
              // creation d'un objet dedans j'ai mis la description saisie et l'id de la
              // nouvelle pub ajoutée, cet objet sera ajouter dans le tableau posts
              // pour l'affiché avec tous les publication
              const newAddedPost = { description,postId: newPost.data.post.insertId,userId, image: 'http://localhost:4000/images/' + file.name };

              setPosts([newAddedPost, ...posts]);
              setDescription("");
              document.getElementById('desc').value=""
              document.getElementById('file').value=""
              setFile(null)
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