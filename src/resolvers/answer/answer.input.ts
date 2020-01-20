import { inputObjectType } from 'nexus';

export const CreateAnswerInput = inputObjectType({
  name: 'CreateAnswerInput',
  definition(t) {
    t.field('answer', { required: true, type: 'AnswerEnum' });
    t.string('questionID', { required: true });
  },
});
