import React from 'react';

// The component now accepts a 'message' object and the 'currentUser' object as props.
function ChatCard({ message, currentUser }) {

    const { userId, message: text, createdAt } = message;

    console.log("Comparing IDs:", { messageSenderId: userId?._id, loggedInUserId: currentUser?._id });

    // Determine if the message was sent by the currently logged-in user.
    // We use optional chaining (?.) for safety in case some data is missing.
    const isCurrentUser = userId?._id === currentUser?._id;

    // Conditionally set styles based on who sent the message.
    const containerClasses = isCurrentUser
        ? "flex justify-end " // Align to the right for the current user
        : "flex justify-start "; // Align to the left for others

    const bubbleClasses = isCurrentUser
        ? "bg-cyan-600 text-white border  border-cyan-400 shadow-lg shadow-cyan-400/30" // Blue bubble for the current user
        : " text-white border bg-slate-800 border-cyan-400 shadow-lg shadow-cyan-400/30 "; // Gray bubble for others

    return (
        // The outer div now controls the left/right alignment.
        <div className={`w-full ${containerClasses} my-1`}>

            {/* This inner div is the chat bubble itself. */}
            <div className={`max-w-md md:max-w-lg p-2 rounded-xl gap-1 ${bubbleClasses}`}>
                
                {/* Sender's Name */}
                <p className="text-sm font-semibold ">
                    {userId?.name || 'Unknown User'}
                </p>

                {/* Message Text (if it exists) */}
                {text && <p className="text-m font-bold">{text}</p>}

                {/* Timestamp */}
                <p className="text-xs text-right opacity-60">
                    {new Date(createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
            </div>
        </div>
    );
}

export default ChatCard;