import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';

// const BASE_URL = "https://user-crud-swln.onrender.com";
const BASE_URL = "http://localhost:8080";

function App() {
  const [users, setUsers] = useState([])

  const getUser = async () => {
    try {
      const users = await axios.get(BASE_URL + "/users");
      setUsers(users.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  console.log(users);


  return (
    <>
      <h2>hola</h2>
      {users.map((user)=> <p>{user.first_name}</p> )}
    </>
  )
}

export default App
