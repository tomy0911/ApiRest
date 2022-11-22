import { Router } from "express";
const routerProductos = Router();
const products = [
  {
    title: "Samsung S22",
    price: 245700,
    thumbnail:
      "https://d500.epimg.net/cincodias/imagenes/2022/02/09/smartphones/1644422190_105239_1644433302_sumario_normal.jpg",
    id: 1,
  },
];

routerProductos.get("/", (req, res) => {
  res.json(products);
});

routerProductos.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;
  const obj = {
    title,
    price,
    thumbnail,
    id: products.length + 1,
  };
  products.push(obj);
  res.status(201).json(obj);
});

routerProductos.get("/:id", (req, res) => {
  const { id } = req.params;
  const verify = products.some((e) => e.id == Number(id));
  let result;
  let status;
  verify
    ? ((result = products.find((e) => e.id == Number(id))), (status = 200))
    : ((result = { error: "Producto sin localizar" }), (status = 404));
  res.status(status).json(result);
});

routerProductos.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;
  const verify = products.some((e) => e.id === Number(id));
  let result;
  let status;
  if (verify) {
    result = products.find((e) => e.id == Number(id));
    const index = products.indexOf(result);
    result = {
      title,
      price,
      thumbnail,
      id: Number(id),
    };
    products.splice(index, 1, result);
    status = 200;
  } else {
    result = { error: "Producto sin localizar" };
    status = 404;
  }
  res.status(status).json(result);
});

routerProductos.delete("/:id", (req, res) => {
  const { id } = req.params;
  const verify = products.some((e) => e.id === Number(id));
  let result;
  let status;
  if (verify) {
    result = products.find((e) => e.id == Number(id));
    const index = products.indexOf(result);
    products.splice(index, 1);
    result = products;
    status = 200;
  } else {
    result = { error: "Producto sin localizar" };
    status = 404;
  }
  res.status(status).json(result);
});

export default routerProductos;
