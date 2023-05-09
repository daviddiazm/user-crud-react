import React from 'react'

const UserCard = ({ user, deleteUser, loadUserForm }) => {
  const estilos = {
    padding: '5px',
    border: '1px solid #ffff',
    borderRadius:'5px'
  }

  return (
    <article style={estilos}>
      <p style={{color: 'lightskyblue'}}>{user.first_name} {user.last_name}</p>
      <p>{user.email}</p>

      <button onClick={() => deleteUser(user.id)}>❌Delete</button>
      <button onClick={() => loadUserForm(user)}>✏️Edit</button>
    </article>
  )
}

export default UserCard