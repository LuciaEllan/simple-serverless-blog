const BLOG_CONFIG = {
  postsPerPage: 3,
  taggedPostListPerPage: 10,
  contacts: [
    { label: 'Facebook', icon: 'fab fa-facebook-square', url: 'https://www.facebook.com/lucia.ellan' },
    { label: 'EMail', icon: 'email', url: 'mailto:lucia@luciaellan.com' }
  ],
  profileDescriptions: [
    { title: 'Lucia Ellan', caption: 'Wannabe data engineer of all trades' },
    { caption: '<span class="text-italic">Lucia Ellan</span> is an online persona and<br />may not reflect real identity in some ways.' },
    { caption: 'This profile image is created at:<br /><a href="https://make.girls.moe/" target="_blank">MakeGirlsMoe</a>' }
  ],
  leftMenus: [
    { title: 'Home', caption: 'Public main page', icon: 'home', to: '/' }
  ],
  leftAdminMenus: [
    { title: 'Scoreboard', caption: 'Personal scoreboard', icon: 'gamepad', to: '/post/xTAHFozFARaKmClbGzXf' },
    { title: 'QUasar v1 Doc', icon: 'code', href: 'https://v1.quasar-framework.org/introduction-to-quasar' }
  ]
}

function giveIndexKey (dataArray, prefix) {
  for (let i = 0; i < dataArray.length; i++) {
    dataArray[i].key = `${prefix}${i}`
  }
}

giveIndexKey(BLOG_CONFIG.contacts, 'contacts')
giveIndexKey(BLOG_CONFIG.profileDescriptions, 'profileDescriptions')
giveIndexKey(BLOG_CONFIG.leftMenus, 'leftMenus')
giveIndexKey(BLOG_CONFIG.leftAdminMenus, 'leftAdminMenus')

export default BLOG_CONFIG
