import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import UserCard from './components/UserCard';

// const BASE_URL = "https://user-crud-swln.onrender.com";
const BASE_URL = "http://localhost:8080";

function App() {
  const [users, setUsers] = useState([])

  const getUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/users");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${BASE_URL}/users/${userId}`);
      await loadUsers();
    } catch (error) {
      console.log(error);
    }
  }

  const createUser = async (data) => {
    try {
      const res = await axios.post(BASE_URL + "/users", data);
      console.log("la data creada fue ", res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadUsers = async () => {
    try {
      const loadUser = await getUser();
      setUsers(loadUser)
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async (e) => {
    const form = e.target;

    const dataForm = {
      first_name: form.firstNameId.value,
      last_name: form.lastNameId.value,
      email: form.emailId.value,
      password: form.passwordId.value,
      birthday: form.birthdayId.value
    }
    e.preventDefault();
    // form.reset();
    console.log(dataForm);

    await createUser(dataForm);
    await loadUsers();
    // console.log(e);
    // console.log(form);
    // console.log(form.firstNameId);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>

    <form className='formUser' onSubmit={handleSubmit}>
      <label htmlFor="firstNameId">First name: </label>
      <input type="text" name='firstName' id='firstNameId'/>

      <label htmlFor="lastNameId">Last name: </label>
      <input type="text" name='lastName' id='lastNameId'/>

      <label htmlFor="emailId">Email name: </label>
      <input type="email" name='email' id='emailId'/>

      <label htmlFor="passwordId">Password: </label>
      <input type="password" name='password' id='passwordId' />

      <label htmlFor="birthdayId">Birthday: </label>
      <input type="date" name='birthday' id='birthdayId'/>

      <button type="submit">Create User</button>
    </form>

      <section>
        <h2>User list</h2>
        {users.map((user) => (
          <UserCard key={user.id} user={user} deleteUser={deleteUser} />
        ))}
      </section>

    </>
  )
}

export default App
