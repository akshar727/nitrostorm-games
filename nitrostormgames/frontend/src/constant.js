export function convertProductToDict(product) {
  return {
    name: product.name,
    price: product.price,
    src: product.src,
    websocket: product.websocket,
    uuid: product.uuid,
  };
}
const STATIC_URL = "/static/";
export function getStatic() {
  return STATIC_URL;
}
