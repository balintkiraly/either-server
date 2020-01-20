import { extendType } from 'nexus';
import { getUserID } from '../../utils/authentication';
import { CreateQuestionInput } from './question.input';

export const questionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createQuestion', {
      type: 'Question',
      args: { data: CreateQuestionInput.asArg({ required: true }) },
      resolve: async (_parent, { data: { content, optionA, optionB } }, context) => {
        return await context.photon.questions.create({
          data: {
            content,
            optionA,
            optionB,
            author: { connect: { id: getUserID(context) } },
          },
        });
      },
    });
  },
});
