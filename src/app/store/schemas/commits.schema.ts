import { schema } from 'normalizr';
import { developerSchema } from './developers.schema';
import { Commit } from './commit';
import { Developer } from './developer';

export const ENTITY_COMMIT = 'commits';
export const commitSchema = new schema.Entity(
    ENTITY_COMMIT,
    { developer: developerSchema},
    {
        idAttribute: 'sha',
        processStrategy: (entity: any) => {
            return new Commit(
                entity.sha,
                entity.parents.map((parent: any) => parent.sha),
                entity.commit.message,
                entity.commit.author.date,
                new Developer(entity.commit.author.name, entity.commit.author.email)
            );
        }
    }
);
export const commitCollectionSchema = new schema.Array(commitSchema);

commitSchema.define({
    parents: commitCollectionSchema
})
