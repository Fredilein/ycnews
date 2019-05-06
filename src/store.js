var store = {
  state: {
    theme: 'light'
  },
  toggleTheme () {
    if (this.state.theme == 'light') this.state.theme = 'dark'
    else this.state.theme = 'light'
  }
}

export default store;
