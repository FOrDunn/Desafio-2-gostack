import React, { useEffect, useState } from "react";
import api from "./services/api";
import { uuid } from "uuidv4";

import "./styles.css";


function App() {

  const [repositories, setRepositories]  = useState([]);

  useEffect(() => {
    api.get('/repositories', (request,response) => {
      const { title,id,owner} = request.body;

      setRepositories([...repositories,
      {
        title,
        id,
        owner
      },])
    });
  }, []);
  console.log(repositories)

  async function handleAddRepository() {
    
    
    const response = await api.post('repositories', {
      title: `novo projeto ${uuid()}`,
      owner: 'ABC'
    });



    setRepositories([...repositories, `novo projeto ${uuid()}`]);
    console.log(repositories);
  }

  async function handleRemoveRepository(id) {
    // TODO
  }

  return (
    <>
      <div>
        <ul data-testid="repository-list">
          {repositories.map(repository => <li key={repository.id}>{repository.title}</li>)}
        </ul>
      </div>
      <div>
      <ul data-testid="repository-list">
          <li>
            <button onClick={() => handleRemoveRepository(1)}>Remover</button>
          </li>
        </ul>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </>
  );
}

export default App;
