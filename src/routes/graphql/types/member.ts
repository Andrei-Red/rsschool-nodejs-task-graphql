import {
  GraphQLEnumType,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { ProfilesType } from './profile.js';
import prismaClient from '../prismaClient.js';
import { Member } from '../interfaces/Member.js';

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    basic: {
      value: 'basic',
    },
    business: {
      value: 'business',
    },
  },
});

export const MemberType: GraphQLObjectType  = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: MemberTypeId },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
    profiles: {
      type: ProfilesType,
      resolve: async ({ id }: Member) => {
        await prismaClient.profile.findMany({ where: { memberTypeId: id } });
      },
    },
  }),
});

export const MemberTypeIdNonNull = new GraphQLNonNull(MemberTypeId);

export const MembersType = new GraphQLList(MemberType);
