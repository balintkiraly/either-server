import { config } from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { resolve } from 'path';
import { permissions } from './permissions';
import { schema } from './schema';
import { createContext } from './utils/context';

const path = resolve(__dirname, '../../.env');
config({ path });

new GraphQLServer({
  schema,
  context: createContext,
  middlewares: [permissions],
}).start(() => console.log(`Server ready at: http://localhost:4000`));
