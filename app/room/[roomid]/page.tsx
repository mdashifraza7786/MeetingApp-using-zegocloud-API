"use client"
import React, { useRef, useEffect } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

interface RoomProps {
    params: { roomid: string };
}

const Room = ({ params: { roomid } }: RoomProps) => {
    const myMeetingRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let userName: string | null | undefined = "";

            // Prompt the user until a valid name is entered
            while (!userName || userName.trim() === "") {
                userName = prompt("Enter your name");
            }
        const myMeeting = async (element: HTMLElement) => {
            // Generate kit token
            const appID = 13834278;
            const serverSecret = "949a68e406fb3282fac369e5be917000";
            

            const kitToken = await ZegoUIKitPrebuilt.generateKitTokenForTest(
                appID,
                serverSecret,
                roomid,
                Date.now().toString(),
                userName
            );
            const zg = ZegoUIKitPrebuilt.create(kitToken);
            zg.joinRoom({
                container: element,
                scenario: {
                    mode: ZegoUIKitPrebuilt.OneONoneCall,
                },
                turnOnMicrophoneWhenJoining: true,
                useFrontFacingCamera: true,
                showMyCameraToggleButton: true,
                layout: "Auto",
                showScreenSharingButton: true,
                showPinButton: true,
                sharedLinks: [{
                    url: window.location.origin + window.location.pathname,
                }],
                whiteboardConfig: {
                    showAddImageButton: true,
                    showCreateAndCloseButton: true,
                },
            });
        };

        if (myMeetingRef.current) {
            myMeeting(myMeetingRef.current);
        }
    }, [roomid]);

    return (
        <div>
            <div className="w-screen h-screen absolute top-0 left-0" ref={myMeetingRef} />
        </div>
    );
};

export default Room;