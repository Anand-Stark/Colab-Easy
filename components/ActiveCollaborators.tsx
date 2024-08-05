import { liveblocks } from '@/lib/liveblocks'
import { useOthers } from '@liveblocks/react';
import React from 'react'
import Image from 'next/image'

const ActiveCollaborators = () => {
    
    // extracting others from the liveblocks
    const others = useOthers();

    const collaborators = others.map((collaborators) => collaborators.info)

    console.log(collaborators);
    

  return (
    <ul className='collaborators-list'>
        {collaborators.map(({id, avatar, color, email, name}) => (
           <li key={id}>
                <Image
                src ={avatar}
                alt='User'
                width={100}
                height={100}
                className='inline-block size-8 rounded-full right-2 ring-dark-100'
                style={{border: `3px solid ${color}`}}   
                />
           </li>
        ))}
    </ul>
  )
}

export default ActiveCollaborators