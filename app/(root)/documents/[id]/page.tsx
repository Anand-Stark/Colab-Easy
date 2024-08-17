import CollaborativeRooms from "@/components/CollaborativeRooms"
import { getDocument } from "@/lib/actions/room.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getClerkUser } from "@/lib/actions/user.actions"

const Document = async ({params : {id}} : SearchParamProps) => {
  const clerkUser = await currentUser()

  if(!clerkUser){
    redirect('/sign-in')
  }

  const room = await getDocument({
     roomId : id,
     userId: clerkUser.emailAddresses[0].emailAddress
  })

  if(!room) redirect('/')

    // access the permission of the user to access a room  : 
  
    const userIds = Object.keys(room.usersAccesses);
    const users = await getClerkUser({ userIds });
  
    const usersData = users.map((user: User) => ({
      ...user,
      userType: room.usersAccesses[user.email]?.includes('room:write')
        ? 'editor'
        : 'viewer'
    }))
  
    const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';  


  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRooms
        roomId={id}
        roomMetadata={room.metadata} users={usersData} currentUserType={currentUserType}      />
    </main>
  )
}

export default Document