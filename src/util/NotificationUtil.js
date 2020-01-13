/* eslint-disable no-new */
export function sendNotification (msg) {
  if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    new Notification(msg)
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // 如果用户同意，就可以向他们发送通知
      if (permission === 'granted') {
        new Notification(msg)
      }
    })
  }
}
