var socket = io();

function updateScroll(el) {
  /**
   * If the user is at the end of the list (within a 50px margin of eror),
   * keep the list scrolled to the bottom as new messages come in.
   * If the user is scrolled up to older messages, keep the view in place
   * until they scroll back to the bottom.
   */
  var isScrolledToBottom = el.scrollHeight - el.clientHeight <= el.scrollTop + 50;

  if (isScrolledToBottom) {
    el.scrollTop = el.scrollHeight;
  }
}

$('#chat-input').submit(function (evt) {
  evt.preventDefault();

  var msg = $('#msg').val();

  /**
   * RegExp to check for at least one non-whitespace character.
   * Prevents users from submitting empty messages to the chat.
   */
  if (!/\S/.test(msg)) {
    return;
  }

  socket.emit('chat message', msg);

  // clear text input
  $('#msg').val('');
});

socket.on('chat message', function (msg) {
  var msgList = document.getElementById('message-list'),
      newMsg = document.createElement('li');

  newMsg.textContent = msg;

  msgList.appendChild(newMsg);

  updateScroll(msgList);
});
