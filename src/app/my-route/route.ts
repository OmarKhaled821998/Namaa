import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'categories', // Adjust the collection name as needed
    limit: 10, // Optional: limit the number of results
    depth: 0, // Optional: specify the depth of nested relationships
  })

  return Response.json(data)
}

// https://localhost:3000/my-route