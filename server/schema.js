const graphql = require('graphql')
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} = graphql

const posts = [
  {
    id: 1,
    title: 'First post',
    description: 'Content of the first post',
  },
  {
    id: 2,
    title: 'Second post',
    description: 'Content of the second post',
  },
]

const postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLInt },
    title: { type: GraphQLString, },
    description: { type: GraphQLString, },
  },
})

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    post: {
      type: postType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (source, { id }) => {
        return posts[id]
      },
    },
    posts: {
      type: new GraphQLList(postType),
      resolve: () => {
        return posts
      },
    },
  },
})

const mutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createPost: {
      type: postType,
      args: { 
        title: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve: (obj, args) => {
        const newPost = {
          id: posts.length + 1,
          title: args.title, 
          description: args.description
        }
        posts.push(newPost)
        return posts[posts.length-1]
      }
    }
  },
})

const schema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType
})

module.exports = schema
