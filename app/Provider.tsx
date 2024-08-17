"use client";
import { ClientSideSuspense, LiveblocksProvider } from "@liveblocks/react";
import { ReactNode } from "react";
import Loader from "@/components/Loader";
import { getClerkUser, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";


const Provider = ({ children }: { children: ReactNode }) => {

  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUser({ userIds });

        return users;
      }}
      resolveMentionSuggestions={async ({ text, roomId }) => {
        const roomUsers = await getDocumentUsers({ 
          roomId,
          currentUser : clerkUser?.emailAddresses[0].emailAddress!,
          text

         });


         return roomUsers;
      }}
    >
      <ClientSideSuspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
