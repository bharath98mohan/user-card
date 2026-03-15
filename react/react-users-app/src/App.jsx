import { useEffect, useState } from "react";
import Card from "./components/Card";
import "./App.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: "pswd1234" },
      });
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleEdit = async (user) => {
    try {
      const newName = prompt("Edit the name", `${user.name}`);

      if (newName === null) {
        return;
      }

      const trimmedName = newName.trim();

      if (!trimmedName || trimmedName === user.name) {
        return;
      }

      setLoading(true);
      const response = await axios.put(
        `${API_URL}/users/${user.id}`,
        { name: trimmedName },
        {
          headers: { Authorization: "pswd1234" },
        },
      );
      console.log(response.data);
      setLoading(false);
      fetchUsers();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const popup = window.confirm("Are you sure you want to delete");
    if (!popup) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: "pswd1234" },
      });
      console.log(response.data);
      setLoading(false);
      fetchUsers();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const normalizedSearch = (search || "").trim().toLowerCase();

  const filteredUsers = users.filter((user) => {
    if (!normalizedSearch) return true;

    const name = (user.name || "").toLowerCase();
    const email = (user.email || "").toLowerCase();

    return name.includes(normalizedSearch) || email.includes(normalizedSearch);
  });

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="App">
      <h2>Users List</h2>
      <input
        type="text"
        placeholder="Search users.."
        className="search-box"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="outer-card">
        {filteredUsers.length ? (
          filteredUsers.map((user) => (
            <Card
              key={user.id}
              user={user}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          ))
        ) : (
          <h2>No users found</h2>
        )}
      </div>
    </div>
  );
};

export default App;
