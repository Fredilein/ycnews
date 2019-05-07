import Articles from './components/Articles.vue'
import Comments from './components/Comments.vue'

export default [
  {
    path: '/',
    name: 'articles',
    component: Articles
  },
  {
    path: '/comments/:Aid',
    name: 'comments',
    component: Comments
  }
]
