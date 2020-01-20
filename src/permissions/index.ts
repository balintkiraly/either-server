import { rule, shield } from 'graphql-shield';
import { getUserID } from '../utils/authentication';

const rules = {
  isAuthenticatedUser: rule()((_parent, _rgs, context) => {
    const userID = getUserID(context);
    return true;
  }),
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
    randomQuestion: rules.isAuthenticatedUser,
  },
  Mutation: {
    createAnswer: rules.isAuthenticatedUser,
    createQuestion: rules.isAuthenticatedUser,
  },
});
