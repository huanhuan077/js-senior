import {isArray} from './util'

// 格式化商品列表某个商品的数据格式
/**
 * @param  {[type]}
 * @return {[type]}
 */
export function productList (list) {
  let filterProduct = []
  if (isArray(list) && list.length) {
    list.forEach((product, index) => {
      if (isArray(product.prices) && product.prices.length) {
        product.lessBuy = 0
        product.lessPrice = 0
        product.prices.forEach((price) => {
          if (product.lessBuy) {
            if (Number(price.trans_amout) < Number(product.lessBuy)) {
              product.lessBuy = Number(price.trans_amout)
            }
          } else {
            product.lessBuy = Number(price.trans_amout)
          }
          if (product.lessPrice) {
            if (Number(price.price) < Number(product.lessPrice)) {
              product.lessPrice = Number(price.price)
            }
          } else {
            product.lessPrice = Number(price.price)
          }
        })
        filterProduct.push(product)
      }
    })
    return filterProduct
  }
}
