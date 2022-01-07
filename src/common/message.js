/**
 * 提示消息message封装
 * @type success
 *       error
 *       info
 *       warning
 *       loading
 */

import { Message } from 'element-ui'

export const MessageFun = (type, notice, duration = 3) =>
  Message[type](notice, duration)

export const Config = (options = { maxCount: 1 }) => {
  Message.config(options)
}

export const Destroy = () => {
  Message.destroy()
}
