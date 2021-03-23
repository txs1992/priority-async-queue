import { Vue, Component } from 'vue-property-decorator'
import PriorityAsyncQueue from '../../src/index'

@Component({
  name: 'simple',
})
export default class PageSimple extends Vue {
  send() {
    const paq = new PriorityAsyncQueue()

    paq.add(new Promise((resolve: any) => resolve('1')))
    paq.add(new Promise((resolve: any) => setTimeout(() => resolve('2'), 100)))
    paq.add(new Promise((resolve: any) => setTimeout(() => resolve('3'), 10)))
    paq.add(new Promise((resolve: any) => resolve('4')))
    paq.add([
      new Promise((resolve: any) => setTimeout(() => resolve('5'), 300)),
      new Promise((resolve: any) => resolve('6')),
    ])

    paq.call((data: any[], done: boolean) => {
      console.log('call: ', data, done)
    })
  }
}
