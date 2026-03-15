import "../App.css";

const Card = ({ user, handleDelete, handleEdit }) => {
  return (
    <div className="card" key={user.id}>
      <img
        className="robo-img"
        src={`https://robohash.org/${user.id}`}
        alt={`${user.name}`}
      />
      <h2>{user.name}</h2>
      <p>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>
      <button className="btn-style" onClick={() => handleEdit(user)}>
        Edit
      </button>
      <button className="btn-style" onClick={() => handleDelete(user.id)}>
        Delete
      </button>
    </div>
  );
};

export default Card;
