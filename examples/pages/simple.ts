import { Vue, Component } from 'vue-property-decorator'
import PriorityPromiseQueue from '../../src/index'

@Component({
  name: 'simple',
})
export default class PageSimple extends Vue {
  send() {
    const ppq = new PriorityPromiseQueue()

    ppq.add(new Promise((resolve: any) => resolve('1')))
    ppq.add(new Promise((resolve: any) => setTimeout(() => resolve('2'), 100)))
    ppq.add(new Promise((resolve: any) => setTimeout(() => resolve('3'), 10)))
    ppq.add(new Promise((resolve: any) => resolve('4')))
    ppq.add([
      new Promise((resolve: any) => setTimeout(() => resolve('5'), 300)),
      new Promise((resolve: any) => resolve('6')),
    ])

    ppq.call((data: any[], done: boolean) => {
      console.log('call: ', data, done)
    })
  }
}
