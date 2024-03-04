import { GraphQLObjectType } from 'graphql/index.js'

import prismaClient from './prismaClient.js'
import { UUIDType, UUIDTypeNonNull } from './types/uuid.js'
import { UserType, UsersType } from './types/user.js'
import { PostType, PostsType } from './types/post.js'
import { ProfileType, ProfilesType } from './types/profile.js'
import { MemberType, MemberTypeIdNonNull, MembersType } from './types/member.js'
import { User } from './interfaces/User.js'
import { Post } from './interfaces/Post.js'
import { Profile } from './interfaces/Profile.js'
import { Member } from './interfaces/Member.js'

export const Query = new GraphQLObjectType({
  name: 'Query',

  fields: () => ({
    user: {
      type: UserType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }: User) =>
        await prismaClient.user.findFirst({ where: { id } }),
    },

    users: {
      type: UsersType,
      resolve: async () => await prismaClient.user.findMany(),
    },

    post: {
      type: PostType,
      args: { id: { type: UUIDTypeNonNull } },
      resolve: async (_parent, { id }: Post) =>
        await prismaClient.post.findFirst({ where: { id } }),
    },

    posts: {
      type: PostsType,
      resolve: async () => await prismaClient.post.findMany(),
    },

    profile: {
      type: ProfileType,
      args: { id: { type: UUIDType } },
      resolve: async (_parent, { id }: Profile) =>
        await prismaClient.profile.findFirst({ where: { id } }),
    },

    profiles: {
      type: ProfilesType,
      resolve: async () => await prismaClient.profile.findMany({}),
    },

    memberType: {
      type: MemberType,
      args: {
        id: { type: MemberTypeIdNonNull },
      },
      resolve: async (_parent, { id }: Member) =>
        await prismaClient.memberType.findFirst({ where: { id } }),
    },

    memberTypes: {
      type: MembersType,
      resolve: async () => await prismaClient.memberType.findMany(),
    },
  }),
})
