import Articles from './components/Articles.vue'
import Comments from './components/Comments.vue'
import Askhn from './components/Askhn.vue'

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
  },
  {
    path: '/ask/:Aid',
    name: 'ask',
    component: Askhn
  }
]
