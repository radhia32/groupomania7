import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from '../components/Header';

const Users = () => {
  const [users, setUsers]=useState([]);

  useEffect(() => {
    const getUsers= async () => {
      const usersResult = await axios.get("http://localhost:4000/api/user", {
        headers: {
          authorization: `bearer ${localStorage.getItem("TOKEN")}`
        }
      });
      console.log("postResult", usersResult);
      setUsers(usersResult.data.result);
    };
    getUsers();
  }, []);

  const userRole = localStorage.getItem("ROLE");
  const userId = localStorage.getItem("USERID");
  return (
    <div className="app">
      <Header />
<table>
  <tr>
    <th>Prenom</th>
    <th>Nom</th>
    <th>Email</th>
    <th>Actions</th>
  </tr>
  {users?.map((user) => (
        user.userId !=userId &&  <tr style={{ textAlign: 'center'}}>
              <td>{user.prenon}</td>
              <td>{user.nom}</td>
              <td>{user.email}</td>
              <td>{userRole==="admin" &&<button
              onClick={async () => {
                const result = await axios.delete(
                  "http://localhost:4000/api/user/" +user.userId,{ headers: {
                    authorization: `bearer ${localStorage.getItem("TOKEN")}`
                  }}
                )
                console.log("result", result);
                const filtredUsers = users.filter(
                  (userItem) => userItem.userId !== user.userId
                );
                setUsers(filtredUsers);
              }}
              >delete</button>}</td>
          </tr>
        
      ))}

</table>

    </div>
  );
};

export default Users;