import MainLayout from 'layouts/MainLayout'
import SinglePostPage from 'pages/SinglePost'
import MultiPostPage from 'pages/PagedPost'
import EditPostPage from 'pages/EditPost'

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
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
