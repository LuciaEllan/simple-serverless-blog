import TheApp from 'layouts/TheApp'
import ReadPost from 'layouts/ReadPost'
import SinglePostPage from 'pages/SinglePost'
import MultiPostPage from 'pages/PagedPost'
import CreatePostPage from 'pages/CreatePost'

const routes = [
  {
    path: '/',
    component: TheApp,
    children: [
      {
        path: '',
        component: ReadPost,
        children: [
          { path: '', component: MultiPostPage }
        ]
      },
      {
        path: 'post',
        component: ReadPost,
        children: [
          { path: ':post_id', component: SinglePostPage }
        ]
      },
      {
        path: 'write',
        component: CreatePostPage
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
