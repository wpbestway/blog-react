export const add = (model: any, conditions: Object) => {
  return new Promise((resolve, reject) => {
    model.create(conditions, (err: any, res: Object | null) => {
      if (err) {
        reject(res)
      } else {
        resolve(res)
      }
    })
  })
}

// any可优化 https://mongoosejs.com/docs/api.html#query_Query-setOptions
export const findOne = (model: any, conditions: Object, fields?: string, options?: any) => {
  return new Promise((resolve, reject) => {
    model.findOne(conditions, fields, options, (err: any, res: Object | null) => {
      if (err) {
        reject(err)
      } else {
        resolve(res)
      }
    })
  })
}

export const findPage = async (model: any, conditions: Object, fields?: string, options?: any) => {
  const sort = options.sort === undefined ? { _id: -1 } : options.sort
  delete options.sort

  const getCount = () => {
    return new Promise((resolve, reject) => {
      model.find(conditions, fields).countDocuments({}, (err: any, res: object) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
  const count = await getCount()

  return new Promise((resolve, reject) => {
    model.find(conditions, fields, options, (err: any, res: object) => {
      if (err) {
        reject(err)
      } else {
        resolve({ count, list: res })
      }
    })
  })
}