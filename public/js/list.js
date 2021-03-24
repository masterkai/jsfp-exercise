function app(state, output, dispatch) {
  R.compose(
    append(view(state)),
    clear()
  )(output)

  const stop = dispatch(e => {
    stop()
    e.preventDefault()
    const newText = getText()
    if (newText !== '') {
      const newState = [
        ...state,
        newText
      ]
      setText('')
      app(newState, output, dispatch)
    } else {
      return false
    }


  })
}

function view(state) {
  const el = elem('div')

  return state.length > 0 ? R.pipe(
    ...state.map((content, index) => append(message(content, index)))
  )(elem('div')) : el

}


function message(content, index) {
  return R.compose(
    append(text(content)),
    attr('data-index', index),
    addClass('bg-light'),
    addClass('p-2'),
    addClass('mb-2'),
  )(elem('div'))
}

const buttonClick = on('click', getElem('message-button'))

app(
  Object.freeze([]),
  getElem('message-list'),
  buttonClick
)

