import { generateEntityFromJSON } from '../../config/create-entity';

const json = {};

// Generate the entity class from the JSON
export const Todos = generateEntityFromJSON(json, 'todos');
