import { INSPECT_MAX_BYTES } from "buffer";

export const add = (model, conditions) => {
  return new Promise((resolve, reject) => {
    model.create(conditions, (err, res) => {
      if (err) {
        console.error('Error:' + JSON.stringify(err))
        reject(err)
      } else {
        console.log('save success')
        resolve(res)
      }
    })
  })
}

/* 
 * 非关联查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件, 如顺序，某些字段不查找等
 * @param options
 */
export const findOne = (model, conditions, fields, options = {}) => {
  var sort = options.sort == undefined ? { _id: -1 } : options.sort
  delete options.sort

  return new Promise((resolve, reject) => {
    model.findOne(conditions, fields, options, function (err, res) {
      if (err) {
        console.log('ERROR:' + JSON.stringify(err))
        reject(err)
        return false
      } else {
        if (res) {
          console.log('findone success')
        } else {
          console.log('findone success && no data')
        }
        resolve(res)
      }
    }).sort(sort)
  })
}

/* 
 * 非关联查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件, 如顺序，某些字段不查找等
 * @param options
 */
export const find = (model, conditions, fields, options = {}) => {
  var sort = options.sort == undefined ? { _id: -1 } : options.sort
  delete options.sort

  return new Promise((resolve, reject) => {
    model.find(conditions, fields, options, function (err, res) {
      if (err) {
        console.log('ERROR:' + JSON.stringify(err))
        reject(err)
        return false
      } else {
        if (res.length != 0) {
          console.log('find success')
        } else {
          console.log('find success && no data')
        }
        resolve(res)
      }
    }).sort(sort)
  })
}

/* 
 * 非关联分页查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件, 如顺序，某些字段不查找等
 * @param options
 */
export const findPage = async (model, conditions, fields, options = {}) => {
  var sort = options.sort == undefined ? { _id: -1 } : options.sort
  delete options.sort

  const getCount = () => {
    return new Promise((resolve, reject) => {
      model.find(conditions, fields).count({}, (err, res) => {
        if (err) {
          console.log('查询长度发生错误')
          return reject(err)
        }
        console.log(9, res)
        resolve(res)
      })
    })
  }
  const count = await getCount()

  return new Promise((resolve, reject) => {
    model.find(conditions, fields, options, (err, res) => {
      if (err) {
        console.log('ERROR:' + JSON.stringify(err))
        reject(err)
        return false
      } else {
        if (res.length != 0) {
          console.log('find success')
          resolve({
            list: res,
            total: count
          })
        } else {
          console.log('find success but no data')
          resolve({
            list: res,
            count: count
          })
        }
      }
    }).sort(sort)
  })
}

/* 
 * 更新实例
 * @param model
 * @param conditions 更新查询的条件
 * @param update 更新条件
 * @param options
 */
export const update = (model, conditions, update, options) => {
  return new Promise((resolve, reject) => {
    console.log(conditions, update)
    model.update(conditions, update, options, (err, res) => {
      if (err) {
        console.error('UPDATE ERROR:' + JSON.stringify(err))
        reject(err)
        return false
      }
      console.log(res)
      if (res.n != 0) {
        console.log('update success')
      } else {
        console.log('update failed: no this data')
      }
      resolve(res)
    })
  })
}

/* 
 * 删除实例
 * @param model
 * @param conditions 更新查询的条件
 * @param update 更新条件
 * @param options
 */
export const remove = (model, conditions, update, options) => {
  return new Promise((resolve, reject) => {
    console.log(conditions, update)
    model.remove(conditions, (err, res) => {
      if (err) {
        console.error('UPDATE ERROR:' + JSON.stringify(err))
        reject(err)
        return false
      }
      if (res.n != 0) {
        console.log('remove success')
      } else {
        console.log('remove failed: no this data')
      }
      resolve(res)
    })
  })
}
