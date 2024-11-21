const http = require("node:http");
const url = require("node:url");
const { ResData } = require("./lib/resData");
const { Repository } = require("./lib/repository");
const path = require("node:path");
const { bodyParser } = require("./lib/bodyParser");
const { CategoryEntity } = require("./lib/categoryEntity");
const { Fruit } = require("./lib/fruit");
const { User } = require("./lib/user");
//for category
const categoryDir = path.join(__dirname, "database", "categories.json");
const categoryRepo = new Repository(categoryDir);
//for fruit
const fruitDir = path.join(__dirname, "database", "fruits.json");
const fruitRepo = new Repository(fruitDir);
//for user
const userDir = path.join(__dirname, "database", "user.json");
const userRepo = new Repository(userDir);
async function handleRequest(req, res) {
  const method = req.method;
  const parsedUrl = url.parse(req.url).pathname.split("/");

  // ------------------ category get,post,delete --------------------------

  // category get

  if (method === "GET" && parsedUrl[1] === "category") {
    const getAllData = await categoryRepo.read();

    const resData = new ResData(200, "success", getAllData);

    res.writeHead(resData.statusCode);
    res.end(JSON.stringify(resData));

    // category post
  } else if (method === "POST" && parsedUrl[1] === "category") {
    const body = await bodyParser(req);

    if (!body.name) {
      const resData = new ResData(400, "Please provide a name");
      res.writeHead(resData.statusCode);

      return res.end(JSON.stringify(resData));
    }

    const newCategory = new CategoryEntity(body.name, 0);

    await categoryRepo.writeNewData(newCategory);

    const resData = new ResData(201, "created", newCategory);

    res.writeHead(resData.statusCode);
    res.end(JSON.stringify(resData));

    // category delete
  } else if (
    method === "DELETE" &&
    parsedUrl[1] === "category" &&
    parsedUrl[2]
  ) {
    const id = parsedUrl[2];
    const data = await categoryRepo.read();

    const itemIndex = data.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      const resData = new ResData(404, "No object found with the given id");
      res.writeHead(resData.statusCode);
      return res.end(JSON.stringify(resData));
    }

    data.splice(itemIndex, 1);
    await categoryRepo.write(data);

    const resData = new ResData(200, "Deleted successfully");
    res.writeHead(resData.statusCode);
    res.end(JSON.stringify(resData));

    // category put
  } else if (method === "PUT" && parsedUrl[1] === "category" && parsedUrl[2]) {
    const body = await bodyParser(req);

    const id = parsedUrl[2];
    const data = await categoryRepo.read();
    const itemIndex = data.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      const resData = new ResData(404, "No object found with the given id");
      res.writeHead(resData.statusCode);
      return res.end(JSON.stringify(resData));
    }
    data[itemIndex].name = body.name;
    await categoryRepo.write(data);
    const resData = new ResData(200, "Updated successfully");
    res.writeHead(resData.statusCode);
    res.end(JSON.stringify(resData));
  }

  // -------------------Fruit get,post,delete,put-----------------------------

  // fruit get

  if (method === "GET" && parsedUrl[1] === "fruits") {
    const getAllData = await fruitRepo.read();

    const resData = new ResData(200, "success", getAllData);

    res.writeHead(resData.statusCode);
    res.end(JSON.stringify(resData));

    // fruit post
  } else if (method === "POST" && parsedUrl[1] === "fruits") {
    const body = await bodyParser(req);

    if (!body.name || !body.price || !body.count) {
      const resData = new ResData(400, "Must be name,price,count");
      res.writeHead(resData.statusCode);
      return res.end(JSON.stringify(resData));
    }

    const newCategory = new Fruit(body.name, body.count, body.price);

    await fruitRepo.writeNewData(newCategory);

    const resData = new ResData(201, "created", newCategory);

    res.writeHead(resData.statusCode);
    res.end(JSON.stringify(resData));

    // fruit delete
  } else if (method === "DELETE" && parsedUrl[1] === "fruits" && parsedUrl[2]) {
    const id = parsedUrl[2];
    const data = await fruitRepo.read();

    const itemIndex = data.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      const resData = new ResData(404, "No object found with the given id");
      res.writeHead(resData.statusCode);
      return res.end(JSON.stringify(resData));
    }

    data.splice(itemIndex, 1);
    await fruitRepo.write(data);

    const resData = new ResData(200, "Deleted successfully");
    res.writeHead(resData.statusCode);
    res.end(JSON.stringify(resData));
  }

  // -------------User get,post,delete----------------

  // User get

  if (method === "GET" && parsedUrl[1] === "user") {
    const getAlldata = await userRepo.read();
    const resData = new ResData(200, "success", getAlldata);
    res.writeHead(resData.statusCode);
    res.end(JSON.stringify(resData));

    // User post
  } else if (method === "POST" && parsedUrl[1] === "user") {
    const body = await bodyParser(req);
    if (!body.name) {
      const resData = new ResData(400, "Must be name");
      res.writeHead(resData.statusCode);
      return res.end(JSON.stringify(resData));
    }

    const user = new User(body.name);

    await userRepo.writeNewData(user);

    const resData = new ResData(200, "created", user);

    res.writeHead(resData.statusCode);
    res.end(JSON.stringify(resData));

    // User delete
  } else if ((method === "DELETE", parsedUrl[1] === "user", parsedUrl[2])) {
    const id = parsedUrl[2];
    const data = await userRepo.read();
    const findIndex = data.findIndex((item) => item.id === id);
    if (findIndex === -1) {
      const resData = new ResData(400, "No object found with the given id");
      res.writeHead(resData.statusCode);
      res.end(JSON.stringify(resData));
    }
    data.splice(itemIndex, 1);
    await userRepo.write(data);
    const resData = new ResData(200, "Deleted successfully");
    res.writeHead(resData.statusCode);

    res.end(json.stringify(resData));
  }
}

const server = http.createServer(handleRequest);

server.listen(7777, () => {
  console.log("http://localhost:7777");
});
//  200 qator kod 🤯
