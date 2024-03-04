import { GraphQLInputObjectType } from 'graphql';

import { UUIDTypeNonNull } from './uuid.js';
import { GraphQLBoolean, GraphQLInt } from 'graphql/index.js';
import { MemberTypeId, MemberTypeIdNonNull } from './member.js';

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    userId: { type: UUIDTypeNonNull },
    memberTypeId: { type: MemberTypeIdNonNull },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  }),
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    memberTypeId: { type: MemberTypeId },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  }),
});
