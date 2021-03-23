type CallParams = (data: any[], done: boolean) => any;

declare class PriorityAsyncQueue {
  add(questQueue: Promise<any>[] | Promise<any>): void

  call(callback: CallParams): void;

  changeSleepTime(time: number): void;
}