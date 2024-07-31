'use client'
import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Edit } from 'lucide-react'
import React from 'react'
import { RoomProvider,ClientSideSuspense } from "@liveblocks/react"

const CollaborativeRooms = () => {
  return (
    
    <RoomProvider id="my-room">
      <ClientSideSuspense fallback={<div>Loading…</div>}>
        <div className="collaborative-room">
        <Header>
        <div className='flex w-fit items-center justify-center gap-2'>
          <p className='document-title'>My Document</p>
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
       </Header>
       <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  
  )
}

export default CollaborativeRooms