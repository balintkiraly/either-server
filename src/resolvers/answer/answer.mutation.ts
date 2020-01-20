import { extendType } from 'nexus';
import { getUserID } from '../../utils/authentication';
import { CreateAnswerInput } from './answer.input';

export const answerMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createAnswer', {
      type: 'Answer',
      args: { data: CreateAnswerInput.asArg({ required: true }) },
      resolve: async (_parent, { data: { answer, questionID } }, context) => {
        return await context.photon.answers.create({
          data: {
            answer,
            question: { connect: { id: questionID } },
            user: { connect: { id: getUserID(context) } },
          },
        });
      },
    });
  },
});
