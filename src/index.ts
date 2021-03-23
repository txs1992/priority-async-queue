/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */

async function sleep(time = 0) {
  return new Promise((reslove: any) => {
    if (time) {
      setTimeout(() => reslove(), time)
    } else {
      reslove()
    }
  })
}
export default class PriorityAsyncQueue {
  // 等待的 promise 队列
  private waitMap: any = {}
  private sleepTime = 10
  private lastIndex = 0
  private currentIndex = 0
  private questPendingQueue: boolean[] = []
  private responcePendingQueue: boolean[] = []

  constructor(params?: { sleepTime: number }) {
    this.sleepTime = params?.sleepTime || 10
  }

  private get isQuestPending(): boolean {
    return this.questPendingQueue.length > 0
  }

  private get isResponcePending(): boolean {
    return this.responcePendingQueue.length > 0
  }

  private async questSequence(quest: Promise<any>, index: number) {
    try {
      const result = await quest
      this.waitMap[index] = [null, result]
    } catch (e) {
      this.waitMap[index] = [e, null]
    }
  }

  private eachQuest(questQueue: Promise<any> | Promise<any>[]) {
    if (Array.isArray(questQueue)) {
      questQueue.forEach((quest: Promise<any>) => this.questSequence(quest, this.lastIndex++))
    } else {
      this.questSequence(questQueue, this.lastIndex++)
    }
  }

  async add(quest: Promise<any> | Promise<any>[]) {
    if (!this.isQuestPending) {
      this.eachQuest(quest)
    } else {
      this.questPendingQueue.push(true)
      await sleep(this.sleepTime)
      this.eachQuest(quest)
      this.questPendingQueue.pop()
    }
  }

  async call(callback: any) {
    if (callback) {
      const iterator = this.generator()
      while (true) {
        try {
          await sleep(1)
          const { value, done } = await iterator.next()
          if (done) {
            callback(value, done)
            break
          } else {
            callback(value, false)
          }
        } catch (e) {
          console.log('Err', e)
        }
      }
    }
  }

  changeSleepTime(time: number) {
    this.sleepTime = time
  }

  private async *generator(): any {
    while (this.currentIndex < this.lastIndex - 1) {
      await sleep(this.sleepTime)

      if (this.waitMap[this.currentIndex]) {
        const list: any[] = []

        while (this.waitMap[this.currentIndex]) {
          list.push(this.waitMap[this.currentIndex])
          delete this.waitMap[this.currentIndex++]
        }

        if (this.currentIndex === this.lastIndex) {
          return list
        } else {
          yield list
        }
      }
    }
  }
}
