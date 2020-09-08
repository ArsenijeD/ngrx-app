import { schema } from 'normalizr';

export const ENTITY_DEVELOPER = 'developers';
export const developerSchema = new schema.Entity(ENTITY_DEVELOPER, {}, { idAttribute: 'name'});
export const developerCollectionSchema = new schema.Array(developerSchema);

