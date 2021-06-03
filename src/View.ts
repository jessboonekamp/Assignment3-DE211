class View { // eslint-disable-line no-unused-vars
  static BLANK () {
    return ' '
  }
  static SPACE () {
    return '&nbsp;'
  }
  static TAB () {
    return '&nbsp;&nbsp;&nbsp;&nbsp;'
  }
  static NEWLINE () {
    return '<br>'
  }
  static clr () {
    document.body.style.fontFamily = 'Courier New'
    document.body.innerHTML = ''
  }
  static out (newText: string) {
    document.body.innerHTML += newText
  }
  static add (newText: string) {
    document.body.innerHTML += View.NEWLINE() + newText
  }
}
