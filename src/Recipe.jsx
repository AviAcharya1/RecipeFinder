import React from 'react';
import { Card, ListGroup, Badge } from 'react-bootstrap';
import { useTheme } from './ThemeContext';

const Recipe = ({ title, calories, image, ingredients }) => {
  const { isDarkTheme } = useTheme();

  return (
    <Card className={`h-100 ${isDarkTheme ? 'bg-dark text-white' : ''}`}>
      <Card.Img variant="top" src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Badge bg={isDarkTheme ? "light" : "secondary"} text={isDarkTheme ? "dark" : "light"} className="mb-2">
          {Math.round(calories)} calories
        </Badge>
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item className={isDarkTheme ? 'bg-dark text-white' : ''}>
          <h6>Ingredients:</h6>
          <ul className="list-unstyled mb-0">
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.text}</li>
            ))}
          </ul>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Recipe;