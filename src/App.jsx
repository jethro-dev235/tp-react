import Counter from "./components/Counter";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import UserCard from "./components/UserCard";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

const toggleDark = () => {
  setDarkMode(!darkMode);
  document.body.classList.toggle("dark");
};

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur de chargement de l'API !");
        setLoading(false);
      });
  }, []);

const addUser = () => {
    if (newName === "" || newEmail === "") {
      return alert("⚠️ Remplis tous les champs !");
    }
    const exists = users.find(
      (u) => u.name.toLowerCase() === newName.toLowerCase()
    );
    if (exists) {
      return alert("⚠️ Cet utilisateur existe déjà !");
    }
    const newUser = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      phone: "N/A",
      address: { city: "N/A" },
    };
    const updatedUsers = [...users, newUser].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setUsers(updatedUsers);
    setNewName("");
    setNewEmail("");
  };
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">

      <button className="dark-mode-btn" onClick={toggleDark}>
    {darkMode ? "☀️ Light" : "🌙 Dark"}
  </button>
      <Header />
<Counter />
<div className="search-bar">
  <input
    type="text"
    placeholder="🔍 Rechercher un utilisateur..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  {search && (
    <p className="search-result">
      🔍 Résultat pour "<strong>{search}</strong>" : {filteredUsers.length} utilisateur(s) trouvé(s)
    </p>
  )}
</div>

      <div className="add-user">
        <input
          type="text"
          placeholder="Nom"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <button onClick={addUser}>➕ Ajouter</button>
      </div>

      <p className="count">👥 Total : {filteredUsers.length} utilisateur(s)</p>
{loading && <Loader />}
{error && (
  <div className="error-box">
    <p>❌ {error}</p>
    <p>Vérifiez votre connexion internet !</p>
  </div>
)}

      <div className="users-grid">
        {filteredUsers.map((user) => (
  <UserCard
  key={user.id}
  id={user.id}
  index={users.indexOf(user)}
  name={user.name}
  email={user.email}
  phone={user.phone}
  city={user.address?.city}
  onDelete={() => deleteUser(user.id)}
/>
        ))}
      </div>
    </div>
  );
}

export default App;