import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql'

import { UUIDType } from './uuid.js'
import { UserType } from './user.js'
import { MemberType, MemberTypeId } from './member.js'

import prismaClient from '../prismaClient.js'
import { Profile } from '../interfaces/Profile.js'

export const ProfileType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    user: {
      type: UserType,
      resolve: async ({ userId }: Profile) =>
        prismaClient.user.findFirst({ where: { id: userId } }),
    },
    memberTypeId: { type: MemberTypeId },
    memberType: {
      type: MemberType,
      resolve: async ({ memberTypeId }: Profile) =>
        await prismaClient.memberType.findFirst({ where: { id: memberTypeId } }),
    },
  }),
})

export const ProfilesType = new GraphQLList(ProfileType)
