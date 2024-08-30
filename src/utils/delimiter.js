const delimiter = (value, delimiter = ',') => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}

export default delimiter