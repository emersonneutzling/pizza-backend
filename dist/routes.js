"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListByCategoryController_1 = require("./controllers/product/ListByCategoryController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const RemoveOrderController_1 = require("./controllers/order/RemoveOrderController");
const AddItemController_1 = require("./controllers/order/AddItemController");
const RemoveItemController_1 = require("./controllers/order/RemoveItemController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrdersController_1 = require("./controllers/order/ListOrdersController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const multer_2 = __importDefault(require("./config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload("./tmp"));
// -- Rotas User - Usuario --
router.post("/users", new CreateUserController_1.CreateUserController().handle);
// -- Rotas Loguin -- 
router.post("/session", new AuthUserController_1.AuthUserController().handle);
// -- Rotas Detais - Detalhes do usuario --
router.get("/me", isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
// -- Rotas Category - Categorias
router.post("/categories", isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategoryController().handle);
// -- Rotas List Category - Listar Categorias
router.get("/list", isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
// -- Rotas Product - Produtos
// router.post("/product", isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post("/product", isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle);
// -- Rotas List By Product - Lista por produto
router.get("/category/product", isAuthenticated_1.isAuthenticated, new ListByCategoryController_1.ListByCategoryController().handle);
// -- Rotas Order - Ordem
router.post("/order", isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
// -- Rotas Remove Order - Deletar Ordem
router.delete("/order/remove", isAuthenticated_1.isAuthenticated, new RemoveOrderController_1.RemoveOrderController().handle);
// -- Rotas - order Add Item - 
router.post("/order/add", isAuthenticated_1.isAuthenticated, new AddItemController_1.AddItemController().handle);
// -- Rotas Remove Item Order - Deletar Item da Ordem
router.delete("/order/item/remove", isAuthenticated_1.isAuthenticated, new RemoveItemController_1.RemoveItemController().handle);
// -- Rotas Send Order - Enviar ordem
router.put("/order/send", isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
// -- Rotas List Orders - Listar ordens enviadas
router.get("/orders/list", isAuthenticated_1.isAuthenticated, new ListOrdersController_1.ListOrdersController().handle);
// -- Rotas Detail Order - Detalhes da ordem enviada
router.get("/orders/detail", isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
// -- Rotas Finish Order - Finalizar Ordem pedido
router.put("/order/finish", isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
