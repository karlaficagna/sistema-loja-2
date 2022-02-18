import VueRouter from "vue-router";
import Home from "./pages/Home.vue";
import ProdutoDetalhe from "./pages/ProdutoDetalhe.vue";
import Pedidos from "./pages/Pedidos.vue"

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/produto-detalhe/:_id", name: "produto-detalhe", component: ProdutoDetalhe },
  { path: "/pagina-pedido", name: "pagina-pedido", component: Pedidos },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router;