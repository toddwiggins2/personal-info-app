import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import "./App.css";

const list = [
  {
    id: 1,
    firstname: `Jeff`,
    lastname: `Smith`,
    age: `40`,
  },
  {
    id: 2,
    firstname: `Jane`,
    lastname: `Knuckles`,
    age: `43`,
  },
  {
    id: 3,
    firstname: `Petry`,
    lastname: `McDonald`,
    age: `68`,
  },
  {
    id: 4,
    firstname: `Vickey`,
    lastname: `Jones`,
    age: `67`,
  },
  {
    id: 5,
    firstname: `Matt`,
    lastname: `Bernard`,
    age: `25`,
  },
];

// function App() {
//   const listitems = list.map((list) => (
//     <div key={list.id} className="list-div">
//       <ul className="list-todos">
//         {list.firstname} {list.lastname} age {list.age}
//       </ul>
//       <button className="btn-delete">Delete</button>
//     </div>
//   ));

function App() {
  const [listItems, setListItems] = useState(list);
  const [inputBox, setInputBox] = useState({
    firstname: "",
    lastname: "",
    age: "",
  });

  const handleDelete = (id) => {
    const updatedListItems = listItems.filter((item) => item.id !== id);
    setListItems(updatedListItems);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputBox((prevInputBox) => ({
      ...prevInputBox,
      [name]: value,
    }));
  };

  const handleAdd = (newUser) => {
    newUser = { ...newUser, id: uuidv4() };
    setListItems((prevListItems) => [...prevListItems, newUser]);
    setInputBox({
      firstname: "",
      lastname: "",
      age: "",
    });
    console.log(listItems);
  };

  const handleUpdate = (item) => {
    setListItems((prevArray) => {
      const newArray = prevArray.map((obj) => {
        if (obj.id === item.id) {
          return { ...obj, ...inputBox };
        }
        return obj;
      });
      return newArray;
    });
  };

  const listItemsMap = listItems.map((item) => (
    <div key={item.id} className="list-div">
      <ul className="list-todos">
        {item.firstname} {item.lastname} age {item.age}
      </ul>
      <div style={{ display: "flex", gap: "0.5em" }}>
        <button onClick={() => handleUpdate(item)} className="btn-update">
          Update
        </button>
        <button onClick={() => handleDelete(item.id)} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <div className="search-div">
          <div style={{ display: "flex", gap: ".25em" }}>
            <input
              className="input-box"
              name="firstname"
              value={inputBox.firstname}
              type="text"
              onChange={handleChange}
              placeholder="First Name"
            ></input>
            <input
              className="input-box"
              name="lastname"
              value={inputBox.lastname}
              type="text"
              placeholder="Last Name"
              onChange={handleChange}
            ></input>
            <input
              className="input-box"
              name="age"
              value={inputBox.age}
              type="text"
              placeholder="Age"
              onChange={handleChange}
            ></input>
          </div>
          <button className="btn-add" onClick={() => handleAdd(inputBox)}>
            Add Item
          </button>
        </div>
        {listItemsMap}
      </header>
    </div>
  );
}

export default App;
