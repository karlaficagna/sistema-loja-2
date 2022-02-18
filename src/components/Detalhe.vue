<template>
  <section class="detalhe">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2>Detalhe do Produto</h2>
          <img :src="mostraDetalhe.img" alt="" />
        </div>
        <div class="col-md-9">
          <h2>{{ mostraDetalhe.title }}</h2>
          <p>{{ mostraDetalhe.price }}</p>
        </div>
        <div class="col-md-3">
          <div class="detalhe__box-price">
            <p>Quantidade</p>
            <input @input="toCalculate" type="number" v-model="quantity" />
          </div>
        </div>
        <div class="col-md-12">
          <hr />
          <h3>Descrição:</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged
          </p>
          <h4>
            Total : {{ finalQuantity }} * {{ mostraDetalhe.price }} =
            {{ total.toString().replace(".", ",") }}
          </h4>
        </div>
        <div class="col-md-12">
          <button @click="show = !show">Fazer Pedido</button>
          <transition name="fade">
            <div class="col-md-12" v-if="show">
              <label><h4>Novo Pedido</h4></label>
              <label>Digite o CPF</label>
              <input type="texte" id="cpf" v-model="buscaCpf" />
              <button v-on:click="getBuscaCpf" class="buscarcpf">Buscar</button>
              <div>
                <p class="none">{{ this.nome }} {{ this.sobrenome }}</p>
                <p>{{ this.cpf }}</p>
                <p>{{ this.dataNascimento }}</p>
                <hr />
                <button v-on:click="postPedido">Salvar Pedido</button>
                <div>{{ message }}</div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "Detalhe",
  props: {
    title: String,
    price: String,
    img: String,
    _id: String,
  },
  data: function () {
    return {
      mostraDetalhe: {},

      buscaCpf: "",
      nome: "",
      sobrenome: "",
      dataNascimento: "",
      cpf: "",

      produtoId: "",
      valorTotal: "",
      valorUnitario: "",
      quantidade: "",
      message: "",

      quantity: 1,
      finalQuantity: 1,
      price: "",
      total: 0,
      show: false,
      attention: false,
      textoinfo: false,
    };
  },
  methods: {
    toCalculate: function () {
      this.finalQuantity = this.quantity;
      if (this.quantity === "") {
        this.finalQuantity = 1;
      }
      this.price = parseFloat(this.mostraDetalhe.price);
      const total = this.price * this.finalQuantity;
      this.total = total.toFixed(2);
    },
    getBuscaCpf: async function () {
      const result = await fetch("http://localhost:3000/clientes/busca/" + this.buscaCpf)
        .then((res) => {
          return res.json();
        })
        .catch((error) => {
          return {
            error: true,
            message: error,
          };
        });
      if (!result.error) {
        this.nome = result.nome;
        this.sobrenome = result.sobrenome;
        this.cpf = result.CPF;
        this.dataNascimento = result.dataNascimento;
      }
    },
    postPedido: async function () {
      const novoPedido = {
        produtoId: this.mostraDetalhe._id,
        ValorTotal: this.total,
        valorUnitario: this.price,
        quantidade: this.quantity,
        clienteCPF: this.buscaCpf,
      };
      const result = await fetch("http://localhost:3000/pedidos", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(novoPedido),
      })
        .then((res) => res.json)
        .catch((error) => {
          return {
            error: true,
            message: error,
          };
        });
      if (!result.error) {
        this.message = "Pedido cadastrado com sucesso";
      }
    },
    getProduto: async function () {
      const result = await fetch(
        "http://localhost:3000/produtos/" + this.$route.params._id
      )
        .then((res) => res.json())
        .catch((error) => {
          return {
            error: true,
            message: error,
          };
        });

      if (!result.error) {
        this.mostraDetalhe = result;
      }
    },
  },
  created: function () {
    this.getProduto();
  },
};
</script>

<style>
.detalhe {
  padding: 50px 0px;
}

.detalhe img {
  margin: 20px auto;
  display: block;
}

.detalhe__box-price {
  text-align: right;
  font-weight: bold;
}

#cpf {
  width: 85px;
  height: 30px;
  border-radius: 4px;
  padding: 0px 8px;
}

.detalhe button {
  width: 170px;
  height: 40px;
  border-radius: 6px;
  background-color: #ae382b;
  color: #f5a022;
  border: none;
  font-weight: bold;
  display: block;
  margin: 30px auto;
}
</style>
