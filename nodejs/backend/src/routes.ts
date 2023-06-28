import { Router } from 'express';
import multer from 'multer';

// -- IMPORTS DE CLASSES --
import CreateUserController from './controllers/user/CreateUserController';
import AuthUserController from './controllers/user/AuthUserController';
import DetailUserController from './controllers/user/DetailUserController';
import CreateCategoryController from './controllers/category/CreateCategoryController';
import ListCategoryController from './controllers/category/ListCategoryController';
import CreateProductController from './controllers/product/CreateProductController';
import ListByCategoryController from './controllers/product/ListByCategoryController';
import AddItemController from './controllers/order/AddItemController';
import RemoveItemController from './controllers/order/RemoveItemController';
import SendOrderController from './controllers/order/SendOrderController';
import ListOrderController from './controllers/order/ListOrderController';
import DetailOrderController from './controllers/order/DetailOrderController';
import FinishOrderController from './controllers/order/FinishOrderController';

// -- IMPORTS DE MIDDLEWARES --
import isAuthenticated from './middlewares/isAuthenticated';
import uploadConfig from './config/multer';
import CreateOrderController from './controllers/order/CreateOrderController';
import RemoveOrderController from './controllers/order/RemoveOrderController';

const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))

// -- ROUTES USER --
router.post('/users', new CreateUserController().handle) // novo usuário
router.post('/session', new AuthUserController().handle) // login de usuário
router.get('/me', isAuthenticated, new DetailUserController().handle) // buscando usuário

// -- ROUTES CATEGORY -- 
router.post('/category', isAuthenticated, new CreateCategoryController().handle) // criando uma categoria
router.get('/category', isAuthenticated, new ListCategoryController().handle) // listando as categorias

// -- ROUTES PRODUCT --
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle) // criando um produto
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle) // listando todos os produtos de uma categoria

// -- ROUTES ORDER --
router.post('/order', isAuthenticated, new CreateOrderController().handle) // criando uma ordem (abrindo uma mesa)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle) // deletando uma ordem (fechando uma mesa)
router.post('/order/add', isAuthenticated, new AddItemController().handle) // adicionando um item na ordem
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle) // removendo um item da ordem
router.put('/order/send', isAuthenticated, new SendOrderController().handle) // finalizando uma ordem no app
router.get('/orders', isAuthenticated, new ListOrderController().handle) // listando os pedidos no desktop
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle ) // detalhes do pedido no desktop
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle) // finalizando o pedido no desktop

export { router }; 