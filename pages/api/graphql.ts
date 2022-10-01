// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServer , createPubSub } from '@graphql-yoga/node'
import { User } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib/prisma'

const pubSub = createPubSub()


export const config = {
  api: {
    // Disable body parsing (required for file uploads)
    bodyParser: false,
  },
}

    //  return [{ name: 'Nextjs' },{ name: 'Yoga'},{ name: 'GraphQL'}, { name: 'Nestjs' }, { name: 'Doddy'}];

const schema = {schema: {
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String
        users: [User!]!
       
      }
      type User {
        lname: String
        fname: String
     }
     type Book {
        title: String
        author: String
    }
    type Mutation{
      addUser(lname: String, fname: String): User!
    }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello from Yoga!',
         users: async(__: any,_: any) => {
                return await prisma.user.findMany()
        },
        
      },
      Mutation: {
         addUser: async(parent: any,_: any) => {
           return await prisma.user.create(
            data:{
              lname:"coucou",
              fname:"salut"
            }
       )}  
    },
    context:pubSub
  }
}


export default createServer<{
  req: NextApiRequest
  res: NextApiResponse
}>(schema)