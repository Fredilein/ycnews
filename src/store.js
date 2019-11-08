function setTheme () {
  let stored = localStorage.getItem("ycnews-theme");
  if (stored == "light" || stored == "dark") {
    return stored
  }
  else if (stored == "time") {
    return getTimeTheme()
  }
  else {
    localStorage.setItem("ycnews-theme", "time")
    return getTimeTheme()
  }
}

function getTimeTheme () {
    let d =  new Date();
    let h = d.getHours();
    if (h < 7 || h > 15) return "dark";   // light theme 7 - 15 UTC, 9 - 17 in Zurich
    return "light"
}


var store = {
  state: {
    theme: setTheme(),
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
  updateTheme () {
    this.state.theme = setTheme();
  }
}

export default store;
