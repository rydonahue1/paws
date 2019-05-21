import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
	iconfont: 'md',
	theme: {
		'primary'  : '#26c6da',
		'secondary': '#616161',
		'accent'   : '#d7ccc8',
		'error'    : '#ef9a9a',
		'info'     : '#81d4fa',
		'success'  : '#a5d6a7',
		'warning'  : '#ffe082'
  }
})
