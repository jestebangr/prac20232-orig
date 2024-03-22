import { createApp, reactive, h, computed } from './vue.esm-browser.js'

const reactProps = reactive({
  books: [],
  student: '',
  created: null
})

fetch("/api")
  .then(resp => resp.json())
  .then(json => {
    Object.assign(reactProps, json)
  })
  .catch( _ => console.error('You need configure database parameters'))

const app = createApp(() => h({
  props: ['books', 'student', 'created'],
  setup(props) {
    const title = 'ARSO 2023-2'
    const fmtCreated = computed( () =>  
      new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeStyle: 'short'}).format(new Date(props.created))
    )
    return { title, fmtCreated }
  },
  template: '#main',
}, reactProps))

app.component('dbTable', {
  props: ['books'],
  template: '#tbl-data',
  mounted() {
    const script = document.createElement('script')
    script.append('confetti({ particleCount: 150, spread: 70})')
    this.$el.append(script)
  }
})

app.component('bookCard', {
  props: ['book'],
  template: '#book-card',
  setup(props) {
    const priceHole = computed(() => props.book?.price?.toString().split('.')?.[0] ?? 0 )
    const priceFraction = computed(() => props.book?.price?.toString().split('.')?.[1] ?? 0 )
    return { priceHole, priceFraction}
  }
})

app.component('genRes',{
  props: ['genres'],
  template: '#gen-info'
})

app.component('box',{
  template: '#box'
})

app.component('stars',{
  props: ['stars'],
  template: '#stars',
  setup(props) {
    function starActive(n) {
      return Math.floor(props.stars) >= n
    }
    return { starActive }
  }
})
app.mount('#app')