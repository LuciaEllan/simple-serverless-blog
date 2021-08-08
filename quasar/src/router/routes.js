import MainLayout from 'layouts/MainLayout'
import SinglePostPage from 'pages/SinglePost'
import MultiPostPage from 'pages/PagedPost'
import EditPostPage from 'pages/EditPost'
import TaggedPostList from 'pages/TaggedPostList'
import AllPostList from 'pages/AllPostList'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        component: MultiPostPage
      },
      {
        path: 'post/:post_id',
        component: SinglePostPage
      },
      {
        path: 'edit',
        component: EditPostPage
      },
      {
        path: 'edit/:post_id',
        component: EditPostPage
      },
      {
        path: 'tag/:tag',
        component: TaggedPostList
      },
      {
        path: 'list',
        component: AllPostList
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
