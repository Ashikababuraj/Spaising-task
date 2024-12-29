import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';

import {
  getPersons,
  createPersonsAPI,
  deletePersonsAPI,
  updatePersonsAPI,
} from "../services/api";

function PersonManager() {
  const [persons, setPersons] = useState([]);
  const [newPersonName, setNewPersonName] = useState("");
  const [newPersonParent, setNewPersonParent] = useState(null); // ID of the selected parent
  const [editPersonId, setEditPersonId] = useState(null); // ID of the person being edited
  const [editPersonName, setEditPersonName] = useState("");
  const [editPersonParent, setEditPersonParent] = useState(null);

  // Fetch persons from the API
  const fetchPersons = async () => {
    try {
      const response = await getPersons();
      setPersons(response.data);
    } catch (error) {
      console.error("Error fetching persons:", error);
    }
  };

  // Add a new person
  const addPerson = async () => {
    if (!newPersonName) {
      alert("Name is required.");
      return;
    }
    try {
      await createPersonsAPI({
        name: newPersonName,
        parent: newPersonParent, 
      });
      setNewPersonName("");
      setNewPersonParent(null); 
      fetchPersons(); 
    } catch (error) {
      console.error("Error creating person:", error);
    }
  };

  // editing a person
  const startEdit = (person) => {
    setEditPersonId(person.id);
    setEditPersonName(person.name);
    setEditPersonParent(person.parent);
  };

  // Save person
  const saveEdit = async () => {
    if (!editPersonName) {
      alert("Name is required.");
      return;
    }
    try {
      await updatePersonsAPI(editPersonId, {
        name: editPersonName,
        parent: editPersonParent, 
      });
      setEditPersonId(null); 
      setEditPersonName("");
      setEditPersonParent(null);
      fetchPersons(); 
    } catch (error) {
      console.error("Error updating person:", error);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditPersonId(null);
    setEditPersonName("");
    setEditPersonParent(null);
  };

  // Delete 
  const deletePerson = async (id) => {
    try {
      await deletePersonsAPI(id);
      fetchPersons(); 
    } catch (error) {
      console.error("Error deleting person:", error);
    }
  };

  
  const renderTree = (nodes, parentId = null) => {
    return nodes
      .filter((node) => node.parent === parentId)
      .map((node) => (
        <li key={node.id}>
          {editPersonId === node.id ? (
           
            <>
              <input
                type="text"
                value={editPersonName}
                onChange={(e) => setEditPersonName(e.target.value)}
              />
              <select
                value={editPersonParent || ""}
                onChange={(e) => setEditPersonParent(e.target.value || null)}
              >
                <option value="">No Parent</option>
                {persons
                  .filter((p) => p.id !== node.id) 
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
              <Button onClick={saveEdit} className="add-btn" variant="success">Save</Button>
              <Button onClick={cancelEdit} className="add-btn" variant="warning">Cancel</Button>
            </>
          ) : (
           
            <>
              {node.name}
              <Button onClick={() => startEdit(node)} className="edit-btn sm-btn" variant="primary">Edit</Button>
              <Button onClick={() => deletePerson(node.id)} className="edit-btn sm-btn" variant="danger">Delete</Button>
              {/* <button  className="edit-btn sm-btn" variant="">Edit</button> 
              <button onClick={() => deletePerson(node.id)} className="danger-btn sm-btn">Delete</button>*/}
              <ul>{renderTree(nodes, node.id)}</ul>
            </>
          )}
        </li>
      ));
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div>
      
      <div className="organisation">
      <h1 className="mb-4">Organization</h1>
      <div className="org">
        <input
          type="text"
          placeholder="Enter name"
          value={newPersonName}
          onChange={(e) => setNewPersonName(e.target.value)}
        />
        <select
          value={newPersonParent || ""}
          onChange={(e) => setNewPersonParent(e.target.value || null)}
        >
          <option value="">No Parent</option>
          {persons.map((person) => (
            <option key={person.id} value={person.id}>
              {person.name}
            </option>
          ))}
        </select>
        <Button onClick={addPerson} variant="success" className="add-btn">Add Person</Button>
      </div>

      {/* Display Tree Structure */}
      <h2 className="mt-5 mb-3">Person Tree</h2>
      <ul>{renderTree(persons)}</ul>
    </div>
    </div>
  );
}

export default PersonManager;
