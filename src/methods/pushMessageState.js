// 匯入mitt元件並調用方法
import emitter from '@/methods/emitter'

export default function (res, title = '更新') {
  if (res.data.success) {
    // 調用mitt元件方法 (發送事件)
    emitter.emit('push-message', {
      style: 'success',
      title: `${title}成功`
    })
  } else {
    // 有些訊息是字串，有些是陣列，在此統一格式
    const message = typeof res.data.message === 'string'
      ? [res.data.message] : res.data.message
    emitter.emit('push-message', {
      style: 'danger',
      title: `${title}失敗`,
      content: message.join('、')
    })
  }
}
