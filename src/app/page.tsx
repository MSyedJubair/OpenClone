import prisma from '@/lib/db'
import React from 'react'

const Home = async () => {
  const users = await prisma.user.findMany()

  return (
    <div>
      <div>
        <h1>Users</h1>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </div>
    </div>
  )
}

export default Home