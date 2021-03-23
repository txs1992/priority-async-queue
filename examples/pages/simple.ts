import { Vue, Component } from 'vue-property-decorator'
import PriorityAsyncQueue from '../../src/index'

@Component({
  name: 'simple',
})
export default class PageSimple extends Vue {
  mounted() {
    const paq = new PriorityAsyncQueue()
    console.log('mount：', paq)
  }
}
