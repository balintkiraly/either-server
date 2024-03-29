import { compare, hash } from 'bcryptjs';
import { extendType } from 'nexus';
import { generateJWToken } from '../../utils/authentication';
import { LoginInput, RegisterInput } from './user.input';

export const userMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('register', {
      type: 'AuthPayload',
      args: { data: RegisterInput.asArg({ required: true }) },
      resolve: async (_parent, { data: { name, email, password } }, context) => {
        const hashedPassword = await hash(password, 10);
        const user = await context.photon.users.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });
        return {
          token: generateJWToken(user.id),
          user,
        };
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: { data: LoginInput.asArg({ required: true }) },
      resolve: async (_parent, { data: { email, password } }, context) => {
        const user = await context.photon.users.findOne({
          where: { email: email },
        });
        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);
        if (!passwordValid) {
          throw new Error('Invalid password');
        }
        return {
          token: generateJWToken(user.id),
          user,
        };
      },
    });
  },
});
