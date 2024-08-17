"use client";
import { Editor } from "@/components/editor/Editor";
import Header from "@/components/Header";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Edit, EditIcon } from "lucide-react";
import React, { use, useEffect, useRef, useState } from "react";
import { RoomProvider, ClientSideSuspense } from "@liveblocks/react";
import ActiveCollaborators from "./ActiveCollaborators";
import { Input } from "./ui/input";
import Image from "next/image";
import { updateDocument } from "@/lib/actions/room.actions";
import { Edit2Icon  } from 'lucide-react'
import Loader from './Loader'

const CollaborativeRooms = ({
  roomId,
  roomMetadata,
  users,
  currentUserType
}: CollaborativeRoomProps) => {

  const [documentTitle, setdocumentTitle] = useState(roomMetadata?.title);
  const [loading, setloading] = useState(false);
  const [isEditing, setisEditing] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {

    if(e.key === 'Enter') {
      setloading(true);

      try {
        if(documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);
          
          if(updatedDocument) {
            setisEditing(false);
          }
        }
      } catch (error) {
        console.error(error);
      }

      setloading(false);
    }


  };

  useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if(containerRef.current && !containerRef.current.contains (e.target as Node)){
          setisEditing(false)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
          document.removeEventListener('mousedown', handleClickOutside)
        }
      }
  }, [roomId, documentTitle])

  useEffect(() => {
    if(isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing])

  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {isEditing && !loading ? (
                <>
                  <Input
                    type="text"
                    value={documentTitle}
                    ref={inputRef}
                    placeholder="Enter Title"
                    onChange={(e) => setdocumentTitle(e.target.value)}
                    onKeyDown={updateTitleHandler}
                    disabled={!isEditing}
                    className="document-title-input"
                  />
                </>
              ) : (
                <>
                  <p className="document-title">{documentTitle}</p>
                </>
              )}

              {currentUserType === "editor" && !isEditing && (
                
                <Edit2Icon
                 width={20}
                 height={20}
                 onClick={() => setisEditing(true)}
                 className="pointer"
                />
                
              )}

              {currentUserType!=='editor' && !isEditing && (
                 <p className="view-only-tag">View Only</p>
              )}

              {loading && (
                 <p className="text-sm text-gray-400">saving...</p>
              )}

            </div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />

              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor currentUserType = {currentUserType} roomId={roomId} />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRooms;
