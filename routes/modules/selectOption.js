function selectOption(data) {
  if (!data) return

  const options = {
    'name': false,
    '-name': false,
    'entertainment': false,
    'category': false,
    'location': false
  }
  options[data] = true;
  return options
}

module.exports = selectOption