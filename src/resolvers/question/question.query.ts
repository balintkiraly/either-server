import { extendType } from 'nexus';

export const questionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('randomQuestion', {
      type: 'Question',
      resolve: async (_parent, {}, context) => {
        const questions = await context.photon.questions.findMany();
        return questions[Math.floor(Math.random() * questions.length)];
      },
    });
  },
});
