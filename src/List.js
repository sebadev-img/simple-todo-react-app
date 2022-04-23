import React from "react";
import "./List.css";

function List({ list, deleteItem, editItem }) {
  return (
    <div className="list-container">
      {list.map((item) => {
        const { id, name } = item;
        return (
          <div key={id} className="item-container">
            <p>{name}</p>
            <button className="delete-btn" onClick={() => deleteItem(id)}>
              Eliminar
            </button>
            <button className="edit-btn" onClick={() => editItem(id)}>
              Editar
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default List;
