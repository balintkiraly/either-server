import { objectType } from 'nexus';

export const Question = objectType({
  name: 'Question',
  definition(t) {
    t.model.id();
    t.model.content();
    t.model.optionA();
    t.model.optionB();
    t.model.author();
  },
});
