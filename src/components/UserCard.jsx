import React from 'react'

const UserCard = ({ user, deleteUser, loadUserForm }) => {

  return (
    <article>
      <p style={{ color: 'lightskyblue' }}>{user.first_name} {user.last_name}</p>
      <p>{user.email}</p>

      <button onClick={() => deleteUser(user.id)}>❌Delete</button>
      <button onClick={() => loadUserForm(user)}>✏️Edit</button>
    </article>
  )
}

export default UserCard