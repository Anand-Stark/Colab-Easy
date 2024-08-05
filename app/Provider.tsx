'use client'
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react'
import { ReactNode } from 'react'
import Loader from '@/components/Loader'
import { getClerkUser } from '@/lib/actions/user.actions'

const Provider = ({children} : {children : ReactNode}) => {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth"
    resolveUsers={async ({userIds}) => { 
          const users = await getClerkUser({userIds})

          return users
    }}
    >
      
        <ClientSideSuspense fallback={<div><Loader/></div>}>
          {children}
        </ClientSideSuspense>

    </LiveblocksProvider>
  )
}

export default Provider