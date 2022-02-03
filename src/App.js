import React, { useEffect, useState } from "react";
import api from "./services/api";
import { uuid } from "uuidv4";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
      id: uuid(),
      title: `novo projeto ${uuid()}`,
      owner: 'ABC'
    });


    setRepositories([...repositories, response.data]);
    console.log(repositories);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id))
};

  return (
    <>
      <div>
        <ul data-testid="repository-list">
          {repositories.map(repository => <li key={repository.id}>{repository.title}<button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>)}
        </ul>
      </div>
      <div>
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>
    </>
  );
}

export default App;
