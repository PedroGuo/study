const path = require("path");
const Koa = require("koa");
const serve = require("koa-static");
const cors = require("@koa/cors");
const multer = require("@koa/multer");
const Router = require("@koa/router");

const app = new Koa();
const router = new Router();
const UPLOAD_DIR = path.join(__dirname, "/public/upload");

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    // 设置文件的存储目录
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    // 设置文件名
    cb(null, `${file.originalname}`);
  },
});

const multerUpload = multer({ storage });

router.get("/", async (ctx) => {
  ctx.body = "拖拽文件上传示例（阿宝哥）";
});

router.post(
  "/upload/multiple",
  multerUpload.fields([
    {
      name: "file",
    },
  ]),
  async (ctx, next) => {
    ctx.body = {
      code: 1,
      msg: "文件上传成功",
    };
  }
);

router.post(
  "/upload/single",
  multerUpload.single("file"),
  async (ctx, next) => {
    ctx.body = {
      code: 1,
      msg: "文件上传成功",
    };
  }
);

// 注册中间件
app.use(cors());
app.use(serve(UPLOAD_DIR));
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("app starting at port 3000");
});
