import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import prismaClient from '../prismaClient.js';
import { Post } from '../interfaces/Post.js';

export const PostType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType },
    author: {
      type: UserType,
      resolve: async ({ authorId }: Post) => await prismaClient.user.findFirst({ where: { id: authorId } }),
    },
  }),
});

export const PostsType = new GraphQLList(PostType)
