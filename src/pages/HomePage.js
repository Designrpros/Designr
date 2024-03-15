import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Container = styled.div`
  padding: 20px;
`;

const WebsiteList = styled.ul`
  list-style: none;
  padding: 0;
`;

const WebsiteItem = styled.li`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  margin-left: 10px;
  cursor: pointer;
`;

const HomePage = () => {
  const [websites, setWebsites] = useState([]);
  const [newWebsiteName, setNewWebsiteName] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const addWebsite = () => {
    if (!newWebsiteName.trim()) return;
    const newWebsite = { id: Date.now(), name: newWebsiteName };
    setWebsites([...websites, newWebsite]);
    setNewWebsiteName('');
  };

  const deleteWebsite = (id) => {
    setWebsites(websites.filter((website) => website.id !== id));
  };

  // Navigate to the WebsiteBuilder component
  const editWebsite = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <Container>
      <h1>My Websites</h1>
      <div>
        <input
          type="text"
          value={newWebsiteName}
          onChange={(e) => setNewWebsiteName(e.target.value)}
          placeholder="Enter website name"
        />
        <Button onClick={addWebsite}>Add Website</Button>
      </div>
      <WebsiteList>
        {websites.map((website) => (
          <WebsiteItem key={website.id}>
            {website.name}
            <div>
              <Button onClick={() => editWebsite(website.id)}>Edit</Button>
              <Button onClick={() => deleteWebsite(website.id)}>Delete</Button>
            </div>
          </WebsiteItem>
        ))}
      </WebsiteList>
    </Container>
  );
};

export default HomePage;
