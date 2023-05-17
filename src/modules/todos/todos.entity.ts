import { generateEntityFromJSON } from '../../config/create-entity';

// Your custom schema
const json = {
  name: '',
  email: '',
  mobile: 0,
  isActive: true,
  createdAt: new Date(),
  celebrate: '',
};

// Generate the entity class from the JSON
export const Todos = generateEntityFromJSON(json, 'todos');
