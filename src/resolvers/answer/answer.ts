import { objectType } from 'nexus';

export const Answer = objectType({
  name: 'Answer',
  definition(t) {
    t.model.id();
    t.model.answer();
    t.model.question();
    t.model.user();
  },
});
