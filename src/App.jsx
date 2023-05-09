import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import UserCard from './components/UserCard';

const BASE_URL = "https://user-crud-swln.onrender.com";
// const BASE_URL = "http://localhost:8080";

function App() {
  const [users, setUsers] = useState([])
  const [idUserUpdate, setIdUserUpdate] = useState(null);
  const formRef = useRef(null);

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

  const updateUser = async (userId, userData) => {
    try {
      await axios.put(`${BASE_URL}/users/${userId}`, userData)
      console.log(`El usuario editado fue ${userId}`);
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
    e.preventDefault();
    const form = e.target;

    const dataForm = {
      first_name: form.firstNameId.value,
      last_name: form.lastNameId.value,
      email: form.emailId.value,
      password: form.passwordId.value,
      birthday: form.birthdayId.value
    }
    // form.reset();
    if (idUserUpdate) {
      await updateUser(idUserUpdate, dataForm)
    } else {
      await createUser(dataForm);
    }

    setIdUserUpdate(null);

    await loadUsers();
  }

  const loadUserForm = (userData) => {
    const $form = formRef.current;
    // console.log($form.emailId);
    console.log(userData);
    $form.firstName.value = userData.first_name
    $form.lastName.value = userData.last_name
    $form.email.value = userData.email
    $form.password.value = userData.password
    $form.birthday.value = userData.birthday

    setIdUserUpdate(userData.id);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <>

    <form className='formUser' onSubmit={handleSubmit} ref={formRef}>
      <h2>{idUserUpdate ? "Edit" : "Create"} User</h2>
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

      <button type="submit">{idUserUpdate ? "Edit" : "Create"} User</button>
    </form>

      <section>
        <h2>User list</h2>
        {users.map((user) => (
          <UserCard key={user.id} user={user} deleteUser={deleteUser} loadUserForm={loadUserForm}/>
        ))}
      </section>

    </>
  )
}

export default App
