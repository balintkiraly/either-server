import { makeSchema } from 'nexus'
import { nexusPrismaPlugin } from 'nexus-prisma'
import * as types from './resolvers'

export const schema = makeSchema({
  types,
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./utils/context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
})
