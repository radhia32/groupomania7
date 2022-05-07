import React, { useEffect, useState } from "react";
import axios from "axios";

const Dislike = ({ postId}) => {
  const [dislike, setDislike ]= useState([]);

  useEffect(() => {
    const getdislike = async () => {
      const dislikeResult = await axios.get(`http://localhost:4000/api/dislike/${postId}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("TOKEN")}`
        }
      });
      console.log("postResult", dislikeResult);
      setDislike(dislikeResult.data.result);
    };
    getdislike();
  }, []);

const userId = localStorage.getItem("USERID");
const isDislike = dislike?.find((item) => Number(item.userid) ===Number(userId) && Number(item.postid)=== Number(postId))

  return (
      <div>
     
       {isDislike ?   <button onClick={async () => {   
                  const newAimer= await axios.delete(
                   "http://localhost:4000/api/dislike/" +postId,
                   {
                     headers: {
                       authorization: `bearer ${localStorage.getItem("TOKEN")}`
                     }
                   }
                 );
                 const filtreDislike= dislike.filter(
                    (dislikeItemValue) =>
        
                      !(( Number(dislikeItemValue.postid) ===Number(postId) ) && (Number(dislikeItemValue.userid) ===Number(userId)))
                    
                  );
                  

                 setDislike(filtreDislike)
     
          }}
          >don't dislike </button>
           :
            <button onClick={async () => {   
            const newDislike= await axios.post(
             "http://localhost:4000/api/dislike",
{
               postId: postId
                     },
             {
               headers: {
                 authorization: `bearer ${localStorage.getItem("TOKEN")}`
               }
             }
           );

           console.log("newPost", newDislike.data); 
           const newAddDislike = { userid: Number(userId),postid: Number(postId)};

           setDislike([...dislike, newAddDislike])
       
    }}
    >dislike</button>}
    {dislike.length}
      </div>
    
  );
};

export default Dislike; 