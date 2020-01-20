import { inputObjectType } from 'nexus';

export const CreateQuestionInput = inputObjectType({
  name: 'CreateQuestionInput',
  definition(t) {
    t.string('content', { required: true });
    t.string('optionA', { required: true });
    t.string('optionB', { required: true });
  },
});
