import { generateEntityFromJSON } from '../../config/create-entity';

// Your custom schema
const json = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 25,
  isActive: true,
  createdAt: new Date(),
};

// Generate the entity class from the JSON
export const Todos = generateEntityFromJSON(json, 'todos');
