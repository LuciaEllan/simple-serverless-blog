const BLOG_CONFIG = {
  postsPerPage: 3,
  taggedPostListPerPage: 10,
  contacts: [
    // fill in with your contacts, this will be shown in the footer
    { label: 'Facebook', icon: 'fab fa-facebook-square', url: 'https://www.facebook.com/' },
    { label: 'EMail', icon: 'email', url: 'mailto:someone@somewhere.com' }
  ],
  profileDescriptions: [
    // fill in with your favorite descriptions
    // any of "title", "caption", and "icon" property is optional (you can even add just an empty item for spacing)
    { title: 'Simple Serverless Blog', caption: 'Powered by Firebase' },
    { caption: 'Profile image is located at<br /><span class="text-italic">quasar/src/assets/profile.png</span>' },
    { caption: 'This profile image is created via<br /><a href="https://make.girls.moe/" target="_blank">MakeGirlsMoe</a>' }
  ],
  leftMenus: [
    // you may add more menus, any of "title", "caption", and "icon" property is optional
    // "to" property points to relative path, "href" property points to absolute URL
    // if both "to" and "href" exist, then "href" is ignored
    { title: 'Home', caption: 'Public main page', icon: 'home', to: '/' }
  ],
  leftAdminMenus: [
    // same as leftMenus, but this menu will be shown only to admins
    // be sure not to include anything sensitive in security-wise, as this can be compromised
    { title: 'QUasar v1 Doc', icon: 'code', href: 'https://v1.quasar-framework.org/introduction-to-quasar' },
    { caption: 'Manage your menu at<br /><span class="text-italic">quasar/src/configs/blog-config.js</span>' }
  ]
}

export default BLOG_CONFIG
