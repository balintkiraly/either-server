import { inputObjectType } from 'nexus';

export const SignUpInput = inputObjectType({
  name: 'SignUpInput',
  definition(t) {
    t.string('name', { required: true });
    t.string('email', { required: true });
    t.string('password', { required: true });
  },
});

export const LoginInput = inputObjectType({
  name: 'LoginInput',
  definition(t) {
    t.string('email', { required: true });
    t.string('password', { required: true });
  },
});
