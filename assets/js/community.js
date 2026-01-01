<div id="chat-widget" class="chat-popup">
    <div class="chat-header">
        <div class="user-info">
            <img id="chat-avatar" src="assets/images/girls/luna.jpg" alt="Luna">
            <div>
                <span id="chat-name">Luna</span>
                <p id="typing-status">Online</p>
            </div>
        </div>
        <button onclick="closeChat()">×</button>
    </div>
    
    <div id="chat-display" class="chat-body">
        </div>

    <div id="suggestion-box" class="suggestion-area"></div>

    <div class="chat-footer">
        <input type="text" id="user-input" placeholder="Ask me something..." oninput="handleTyping(this.value)">
        <button onclick="sendChatMessage()">Send</button>
    </div>
</div>
