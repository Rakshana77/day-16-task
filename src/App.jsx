
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const addUser = async () => {
    try {
      const newUser = { name, email };
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const updateUser = async (id) => {
    try {
      const updatedUser = { name, email };
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser);
      const updatedUsers = users.map(user => user.id === id ? { ...user, name, email } : user);
      setUsers(updatedUsers);
      setName('');
      setEmail('');
      setEditingId(null);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user.id);
  };

  return (
    <div className="container">
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-email"> - {user.email}</span> <br/>
              <button className="delete-btn" onClick={() => deleteUser(user.id)}>Delete</button>
              <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
      <h2>{editingId ? 'Edit User' : 'Add User'}</h2>
      <input type="text" className="input" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      {editingId ? (
        <button className="update-btn" onClick={() => updateUser(editingId)}>Update</button>
      ) : (
        <button className="add-btn" onClick={addUser}>Add</button>
      )}
    </div>
  );
};

export default App;
