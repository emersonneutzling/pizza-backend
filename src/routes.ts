import { Router } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";

import {CreateOrderController} from "./controllers/order/CreateOrderController";
import {RemoveOrderController} from "./controllers/order/RemoveOrderController";
import {AddItemController} from "./controllers/order/AddItemController";
import {RemoveItemController} from "./controllers/order/RemoveItemController";
import {SendOrderController} from "./controllers/order/SendOrderController";
import {ListOrdersController} from "./controllers/order/ListOrdersController";
import {DetailOrderController} from "./controllers/order/DetailOrderController";
import {FinishOrderController} from "./controllers/order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import uploadConfif from "./config/multer";

const router = Router();

const upload = multer(uploadConfif.upload("./tmp"));

// -- Rotas User - Usuario --
router.post("/users", new CreateUserController().handle)

// -- Rotas Loguin -- 
router.post("/session", new AuthUserController().handle)

// -- Rotas Detais - Detalhes do usuario --
router.get("/me", isAuthenticated, new DetailUserController().handle)

// -- Rotas Category - Categorias
router.post("/categories", isAuthenticated, new CreateCategoryController().handle)

// -- Rotas List Category - Listar Categorias
router.get("/list", isAuthenticated, new ListCategoryController().handle)

// -- Rotas Product - Produtos
// router.post("/product", isAuthenticated, upload.single('file'), new CreateProductController().handle)

router.post("/product", isAuthenticated, new CreateProductController().handle)

// -- Rotas List By Product - Lista por produto
router.get("/category/product", isAuthenticated, new ListByCategoryController().handle)

// -- Rotas Order - Ordem
router.post("/order", isAuthenticated, new CreateOrderController().handle)

// -- Rotas Remove Order - Deletar Ordem
router.delete("/order/remove", isAuthenticated, new RemoveOrderController().handle)

// -- Rotas - order Add Item - 
router.post("/order/add", isAuthenticated, new AddItemController().handle)

// -- Rotas Remove Item Order - Deletar Item da Ordem
router.delete("/order/item/remove", isAuthenticated, new RemoveItemController().handle)

// -- Rotas Send Order - Enviar ordem
router.put("/order/send", isAuthenticated, new SendOrderController().handle)

// -- Rotas List Orders - Listar ordens enviadas
router.get("/orders/list", isAuthenticated, new ListOrdersController().handle)

// -- Rotas Detail Order - Detalhes da ordem enviada
router.get("/orders/detail", isAuthenticated, new DetailOrderController().handle)

// -- Rotas Finish Order - Finalizar Ordem pedido
router.put("/order/finish", isAuthenticated, new FinishOrderController().handle)

export { router };