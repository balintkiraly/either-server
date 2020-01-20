import { rule, shield } from 'graphql-shield';
import { getUserID } from '../utils/authentication';

const rules = {
  isAuthenticatedUser: rule()((_parent, _rgs, context) => {
    const userId = getUserID(context);
    return Boolean(userId);
  }),
  isPostOwner: rule()(async (_parent, { id }, context) => {
    const userId = getUserID(context);
    const author = await context.photon.posts
      .findOne({
        where: {
          id,
        },
      })
      .author();
    return userId === author.id;
  }),
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
  },
  Mutation: {},
});
