import { makeExecutableSchema } from 'graphql-tools';

const users: any[] = [
    {
        id:1,
        name: 'Jon',
        email: 'jon@email.com'
    },
    {
        id:2,
        name: 'Danny',
        email: 'danny@email.com'
    }
]

const typeDefs = `
    type User{
        id: ID!
        name: String!
        email: String!
    }

    type Query{
        allUsers:[User!]!
    }

    type Mutation {
        createUser(name: String! email: String!): User
    }
`;

const resolvers = {
  
    Query:{
        allUsers:() => users
    },
    Mutation:{
        createUser: (parent, args) => {
            //está usando o assign, para apendar o ID em args, uma vez que os dados
            // são mocados
            const newUser = Object.assign({id: users.length + 1}, args);
            users.push(newUser);
            return newUser;
        }
    }
};

export default makeExecutableSchema({typeDefs,resolvers});