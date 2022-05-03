// todo test this
export const createPromiseTask = (
  promises: Promise<any>[],
  callback?: (progress: number, waitingTable: any[]) => any,
) => {
  return new Promise((resolve, reject) => {
    const total = promises.length
    let left = total
    const table: any[] = Array(total).fill(null)

    promises.forEach((promise, index) => {
      promise.then((value) => {
        table[index] = value
        left -= 1
        callback?.(left / total, [...table])
        if (left === 0) {
          resolve(table)
        }
      })
      promise.catch(reject)
    })
  })

}
