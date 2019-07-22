var store = {
  state: {
    theme: 'light',
    showComments: true,
  },
  toggleTheme () {
    if (this.state.theme == 'light') this.state.theme = 'dark'
    else this.state.theme = 'light'
  },
  toggleComments () {
    let a = this.state.showComments
    this.state.showComments = !a
  },
}

export default store;
