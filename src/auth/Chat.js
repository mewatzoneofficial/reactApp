import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./chatbox.css";

export default function ChatBox({ enyId, name, avatar }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [usersMap, setUsersMap] = useState(new Map());
  const [activeChatId, setActiveChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [unreadTotal, setUnreadTotal] = useState(0);
  const [minimized, setMinimized] = useState(false);
  const [ws, setWs] = useState(null);

  const messageRef = useRef(null);
  const typingTimeoutLocal = useRef(null);
  const typingTimeoutRemote = useRef(null);
  const typingDuration = 2000;

  // Initialize current user
  useEffect(() => {
    setCurrentUser({
      faculityID: "27191761e0bd6ffafaff2dd6691ba0fa23cb950931",
      name: name || "Me",
      avatar: avatar || `https://i.pravatar.cc/50?u=${enyId}`,
    });
  }, [enyId, name, avatar]);

  // Connect WebSocket
  useEffect(() => {
    if (!currentUser) return;

    const socket = new WebSocket("wss://empapi.fpsjob.com/ws/user");
    setWs(socket);

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket");

      socket.send(
        JSON.stringify({
          type: "register",
          loginId: "78003a17db1ac2da8c73ec293b7f8edfb1b6724831",
          page: 1,
          limit: 50,
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "allUsers":
          handleUserList(data.users);
          break;

        case "private message":
          handleIncomingMessage(data.message);
          break;

        case "chat history":
          handleChatHistory(data.messages);
          break;

        case "typing":
          handleTypingFromServer(data.fromId);
          break;

        case "stop typing":
          setTypingUser(null);
          break;

        case "presence":
          updatePresence(data.onlineIds);
          break;

        default:
          console.warn("⚠️ Unknown WS type:", data.type);
          break;
      }
    };

    socket.onclose = () => console.log("❌ WebSocket closed");
    socket.onerror = (err) => console.error("WebSocket error:", err);

    return () => socket.close();
  }, [currentUser]);

  // Format and store users
  const handleUserList = (list) => {
    const map = new Map();
    list.forEach((u) => {
      map.set(String(u.faculityID), {
        faculityID: String(u.faculityID),
        name: u.name || `User ${u.faculityID}`,
        avatar: u.image || `https://i.pravatar.cc/50?u=${u.faculityID}`,
        lastMessage: u.lastMessage,
        lastAt: u.lastAt,
        unreadCount: u.unread_message_count || 0,
        online: u.online === 1,
        messages: [],
      });
    });
    setUsersMap(map);
  };

  // Handle incoming messages
  const handleIncomingMessage = (msg) => {
    const senderId = msg.user1;
    const recipientId = msg.user2;

    const formatted = {
      senderId,
      text: msg.message,
      time: new Date(msg.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setUsersMap((prev) => {
      const updated = new Map(prev);
      const u = updated.get(senderId) || updated.get(recipientId);
      if (u) {
        const newMessages = [...(u.messages || []), formatted];
        const unreadCount =
          activeChatId === u.faculityID ? u.unreadCount : (u.unreadCount || 0) + 1;
        updated.set(u.faculityID, { ...u, messages: newMessages, unreadCount });
      }
      return updated;
    });

    if (activeChatId === senderId || activeChatId === recipientId) {
      setMessages((prev) => [...prev, formatted]);
    }
  };

  // Handle chat history
  const handleChatHistory = (history) => {
    const formatted = (history || []).map((m) => ({
      senderId: m.user1,
      text: m.message,
      time: new Date(m.created_at).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }));
    setMessages(formatted);
  };

  // Open chat
  const openChat = (userId) => {
    const user = usersMap.get(userId);
    if (!user || !ws) return;

    setActiveChatId(userId);
    setMessages(user.messages || []);

    ws.send(
      JSON.stringify({
        type: "chat history",
        user2: userId,
        page: 1,
        limit: 20,
      })
    );

    // Mark as read
    setUsersMap((prev) => {
      const updated = new Map(prev);
      updated.set(userId, { ...user, unreadCount: 0 });
      return updated;
    });
  };

  // Send message
  const sendMessage = () => {
    const text = messageRef.current.value.trim();
    if (!text || !activeChatId || !ws) return;

    ws.send(
      JSON.stringify({
        type: "send message",
        user2: activeChatId,
        message: text,
      })
    );

    const newMsg = {
      senderId: currentUser.faculityID,
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setUsersMap((prev) => {
      const updated = new Map(prev);
      const u = updated.get(activeChatId);
      if (u) updated.set(activeChatId, { ...u, messages: [...u.messages, newMsg] });
      return updated;
    });

    messageRef.current.value = "";
  };

  // Typing indicator
  const handleTyping = () => {
    if (!activeChatId || !ws) return;
    ws.send(JSON.stringify({ type: "typing", toId: activeChatId }));
    clearTimeout(typingTimeoutLocal.current);
    typingTimeoutLocal.current = setTimeout(() => {
      ws.send(JSON.stringify({ type: "stop typing", toId: activeChatId }));
    }, typingDuration);
  };

  const handleTypingFromServer = (userId) => {
    const user = usersMap.get(userId);
    if (userId === activeChatId && user) {
      setTypingUser(user.name);
      clearTimeout(typingTimeoutRemote.current);
      typingTimeoutRemote.current = setTimeout(() => setTypingUser(null), typingDuration);
    }
  };

  const updatePresence = (onlineIds) => {
    setUsersMap((prev) => {
      const updated = new Map(prev);
      onlineIds.forEach((id) => {
        const u = updated.get(id);
        if (u) updated.set(u.faculityID, { ...u, online: true });
      });
      // Set offline for others
      updated.forEach((u) => {
        if (!onlineIds.includes(u.faculityID)) updated.set(u.faculityID, { ...u, online: false });
      });
      return updated;
    });
  };

  // Auto scroll
  useEffect(() => {
    const msgDiv = document.getElementById("messages");
    if (msgDiv) msgDiv.scrollTop = msgDiv.scrollHeight;
  }, [messages]);

  // Total unread
  useEffect(() => {
    const total = Array.from(usersMap.values()).reduce(
      (sum, u) => sum + (u.unreadCount || 0),
      0
    );
    setUnreadTotal(total);
  }, [usersMap]);

  const usersList = Array.from(usersMap.values()).filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`chat-dock ${minimized ? "minimized" : ""}`}>
      {/* Header */}
      <div className="chat-header clearfix" onClick={() => setMinimized(!minimized)}>
        <div className="title pull-left">
          <i className="fa fa-comments"></i> Chat
        </div>
        <div className="actions pull-right">
          
          <button className="btn btn-sm btn-icon" title="Unread Messages">
            <span className="badge">{unreadTotal}</span>
          </button>
        </div>
      </div>

      {!minimized && (
        <div className="chat-body">
          {/* User list */}
          <div className="chat-list">
            <div className="search-box">
              <i className="fa fa-search"></i>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="userListContainer">
              {usersList.map((u) => (
                <div
                  key={u.faculityID}
                  className={`user-item ${activeChatId === u.faculityID ? "active" : ""} ${
                    u.unreadCount > 0 ? "unread" : ""
                  }`}
                  onClick={() => openChat(u.faculityID)}
                >
                  <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt={u.name} />
                  <span className={`status-dot ${u.online ? "online" : "offline"}`}></span>
                  <div className="name">
                    {u.name}
                    {u.lastMessage && (
                      <div className="last-msg text-muted small">{u.lastMessage}</div>
                    )}
                  </div>
                  {u.unreadCount > 0 && <span className="badge">{u.unreadCount}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div className="chat-window">
            <div className="header">
              {activeChatId ? (
                <>
                  <strong>{usersMap.get(activeChatId)?.name}</strong>
                  <small
                    className={`text-muted ${usersMap.get(activeChatId)?.online ? "online" : "offline"}`}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    {usersMap.get(activeChatId)?.online ? "Online" : "Offline"}
                  </small>
                  {typingUser && (
                    <div id="typingIndicator">
                      <span>{typingUser}</span> is typing...
                    </div>
                  )}
                </>
              ) : (
                <strong>Select a user</strong>
              )}
            </div>

            <div className="chat-messages" id="messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${msg.senderId === currentUser?.faculityID ? "me" : "other"}`}
                >
                  {msg.text}
                  <small>{msg.time}</small>
                </div>
              ))}
            </div>

            <div className="chat-input">
              <div className="input-group">
                <input
                  ref={messageRef}
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  onKeyUp={handleTyping}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <span className="input-group-btn">
                  <button className="btn btn-primary" type="button" onClick={sendMessage}>
                    <i className="fa fa-paper-plane"></i>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
