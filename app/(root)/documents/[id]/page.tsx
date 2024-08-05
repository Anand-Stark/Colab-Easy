import CollaborativeRooms from "@/components/CollaborativeRooms"
import { getDocument } from "@/lib/actions/room.actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const Document = async ({params : {id}} : SearchParamProps) => {
  const clerkIUser = await currentUser()

  if(!clerkIUser){
    redirect('/sign-in')
  }

  const room = await getDocument({
     roomId : id,
     userId: clerkIUser.emailAddresses[0].emailAddress
  })

  if(!room) redirect('/')
  
    // access the permission of the user to access a room  : 



  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRooms
        roomId={id}
        roomMetadata={room.metadata} users={[]} currentUserType={"creator"}      />
    </main>
  )
}

export default Document