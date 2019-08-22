/**
 * [description]
 * @param {Array}
 * @param {object}
 * @return {Array} [description]
 */
function urlFormat (query) {
  let paramsQuery = {}
  let queryFormated = []
  if (query) {  
    let stringFilter = query.split(',')
    stringFilter.forEach(element => {
      let queryParams = []
      for (var i = 0; element.length >= i; i++) {
        switch (element.charAt(i)) {
        case '#':
          queryParams = element.split('#')
          paramsQuery[queryParams[0]] = queryParams[1]
          queryFormated = [paramsQuery, '#']
          break
        case ':':
          queryParams = element.split(':')
          paramsQuery[queryParams[0]] = queryParams[1]
          queryFormated = [paramsQuery, ':']
          break
        default:
          break
        }
      }
      // console.log(queryParams)
    })
  }
  return queryFormated
}

const generyFilter = (data, query, callback) => {
  let params = urlFormat(query.stringFilter)
  let dataAll = data.content
  for(let key in params[0]) {
    if (!dataAll.length) {
      return dataAll
    }
    dataAll = dataAll.filter(element => {
      return callback(element[key], params[0][key], params[1])
    })
  }
  return dataAll
}

const requestQuery = (data, query) => {
  return generyFilter(data, query, (element, param, sign) => {
    switch (sign) {
    case '#':
      return String(element).includes(param)
    default:
    case ':':
      return element === param
    }
  })
}

const getAll = (data, query) => {
  requestQuery(data, query)
}

module.exports = {
  getAll
}