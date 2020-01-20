import { AnswerEnum } from '@prisma/photon';
import { objectType } from 'nexus';

export const Question = objectType({
  name: 'Question',
  definition(t) {
    t.model.id();
    t.model.content();
    t.model.optionA();
    t.model.optionB();
    t.field('optionACount', {
      type: 'Int',
      resolve: async ({ id }, _, context) => {
        const answers = await context.photon.answers.findMany({
          where: {
            question: { id },
            answer: AnswerEnum.optionA,
          },
        });
        return answers.length;
      },
    });
    t.field('optionBCount', {
      type: 'Int',
      resolve: async ({ id }, _, context) => {
        const answers = await context.photon.answers.findMany({
          where: {
            question: { id },
            answer: AnswerEnum.optionB,
          },
        });
        return answers.length;
      },
    });
  },
});
