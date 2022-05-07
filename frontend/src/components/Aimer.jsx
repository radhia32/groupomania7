import React, { useEffect, useState } from "react";
import axios from "axios";

const Aimer = ({ postId}) => {
  const [aimer, setAimer ]= useState([]);

  useEffect(() => {
    const getAimer = async () => {
      const aimerResult = await axios.get(`http://localhost:4000/api/aimer/${postId}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("TOKEN")}`
        }
      });
      console.log("postResult", aimerResult);
      setAimer(aimerResult.data.result);
    };
    getAimer();
  }, []);

const userId = localStorage.getItem("USERID");
const isAimer = aimer?.find((item) => Number(item.userid) ===Number(userId) && Number(item.postid)=== Number(postId))

  return (
      <div>
     
       {isAimer ?   <button onClick={async () => {   
                  const newAimer= await axios.delete(
                   "http://localhost:4000/api/aimer/" +postId,
                   {
                     headers: {
                       authorization: `bearer ${localStorage.getItem("TOKEN")}`
                     }
                   }
                 );
                 const filtredAimer= aimer.filter(
                    (aimerItemValue) =>
        
                      !(( Number(aimerItemValue.postid) ===Number(postId) ) && (Number(aimerItemValue.userid) ===Number(userId)))
                    
                  );
                  console.log("filteredaimer", filtredAimer)
                 console.log("newPost", newAimer.data); 
        

                 setAimer(filtredAimer)
     
          }}
          >je n'aime pas </button>
           :
            <button onClick={async () => {   
            const newAimer= await axios.post(
             "http://localhost:4000/api/aimer",
{
               postId: postId
                     },
             {
               headers: {
                 authorization: `bearer ${localStorage.getItem("TOKEN")}`
               }
             }
           );

           console.log("newPost", newAimer.data); 
           const newAddAimer = { userid: Number(userId),postid: Number(postId)};

           setAimer([...aimer, newAddAimer])
       
    }}
    >j'aime </button>}
    {aimer.length}
      </div>
    
  );
};

export default Aimer; 