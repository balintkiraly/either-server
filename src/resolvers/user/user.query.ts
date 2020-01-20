import { extendType } from 'nexus';
import { getUserID } from '../../utils/authentication';

export const Query = extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (_parent, _args, context) => {
        console.log(getUserID(context));
        return context.photon.users.findOne({
          where: {
            id: getUserID(context),
          },
        });
      },
    });
  },
});
