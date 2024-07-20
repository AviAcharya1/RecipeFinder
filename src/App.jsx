import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert, Navbar } from 'react-bootstrap';
import Recipe from './Recipe';
import { useTheme } from './ThemeContext';
import './App.css';

const ThemeSwitcher = () => {
  const { isDarkTheme, toggleTheme } = useTheme();
  return (
    <Button onClick={toggleTheme} variant={isDarkTheme ? "light" : "dark"} className="ms-2">
      {isDarkTheme ? (
        <i className="fas fa-sun"></i>
      ) : (
        <i className="fas fa-moon"></i>
      )}
    </Button>
  );
};
const App = () => {
  const APP_ID = import.meta.env.VITE_APP_ID;
  const APP_KEY = import.meta.env.VITE_APP_KEY;
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('salad');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isDarkTheme } = useTheme();


  useEffect(() => {
    getRecipes();
  }, [query, APP_ID, APP_KEY]);

  const getRecipes = async () => {
    setIsLoading(true);
    setError(null);
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    console.log('Fetching URL:', url);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data.hits);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to fetch recipes. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
<div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      <Navbar bg={isDarkTheme ? "danger" : "dark"} variant="dark" className="mb-5">
        <Container>
          <Navbar.Brand href="#home">Recipe Finder</Navbar.Brand>
          <ThemeSwitcher />
        </Container>
      </Navbar>
      <Container className="py-4">
        <Row className="justify-content-center mb-4">
          <Col md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
          <Row className="align-items-center">
         <Col xs={9} md={10}>
          <Form.Control
        type="text"
        placeholder="Search for recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        aria-label="Search recipes"
        className="mb-2 mb-md-0"
      />
    </Col>
    <Col xs={3} md={2}>
      <div className="d-grid">
        <Button type="submit" variant="primary" className="w-100">
          <i className="fas fa-search"></i>
        </Button>
      </div>
    </Col>
  </Row>
</Form>
          </Col>
        </Row>
        
        {isLoading && (
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Alert variant="info">Loading...</Alert>
            </Col>
          </Row>
        )}
        
        {error && (
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <Alert variant="danger">{error}</Alert>
            </Col>
          </Row>
        )}
        
        <Row className="mt-4">
          {recipes && recipes.map((recipe) => (
            <Col key={recipe.recipe.uri} xs={12} sm={6} lg={4} className="mb-4">
              <Recipe
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default App;