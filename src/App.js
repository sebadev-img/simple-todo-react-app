import { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

import "./App.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(0);
  const [alert, setAlert] = useState({
    msg: "",
    type: "succes",
    show: false,
  });

  const showAlert = (msg, type) => {
    const newAlert = {
      msg: msg,
      type: type,
      show: true,
    };
    setAlert(newAlert);
  };

  const removeAlert = () => {
    const newAlert = {
      msg: "",
      type: "succes",
      show: false,
    };
    setAlert(newAlert);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const addItem = (e) => {
    e.preventDefault();
    if (name) {
      if (isEditing) {
        const newList = list.map((item) => {
          if (item.id === editId) {
            return { ...item, name: name };
          }
          return item;
        });
        setList(newList);
        showAlert("Item Editado", "succes");
        setIsEditing(false);
      } else {
        //is adding a new item to the list
        const newItem = {
          id: Date.now(),
          name: name,
        };
        const newList = [...list, newItem];
        setList(newList);
        showAlert("Item Agregado", "succes");
      }
    } else {
      showAlert("El texto esta vacio", "danger");
    }
    setName("");
  };

  const deleteItem = (id) => {
    const newList = list.filter((item) => item.id !== id);
    setList(newList);
    showAlert("Item Eliminado", "danger");
  };

  const editItem = (id) => {
    setIsEditing(true);
    const item = list.find((item) => item.id === id);
    setEditId(item.id);
    setName(item.name);
  };

  const cleanList = () => {
    setList([]);
    showAlert("Lista Eliminada", "danger");
  };

  return (
    <div className="App">
      {alert.show && (
        <Alert msg={alert.msg} type={alert.type} removeAlert={removeAlert} />
      )}
      <h1>TODO APP</h1>
      <form className="input-container" onSubmit={addItem}>
        <input
          type="text"
          placeholder="Ingrese Texto"
          value={name}
          onChange={handleChange}
        />
        <button type="submit" onClick={addItem}>
          {isEditing ? "Editar" : "Agregar"}
        </button>
      </form>
      {list.length > 0 && (
        <div className="list-container">
          <List list={list} deleteItem={deleteItem} editItem={editItem} />
          <button className="eliminar-btn" onClick={cleanList}>
            Eliminar Todo
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
