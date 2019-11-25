<template>
  <div>
    <div class=" mt-0 text-center">
      <h2 class="mt-0">{{event.titleEvent}}</h2>
      <p class="lead">{{event.subtitleEvent}}</p>
    </div>
    <div class="row">
      <div class="col-md-4 order-md-2 mb-4">
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Vagas</h6>
              <small class="text-muted"></small>
            </div>
            <span class="text-muted">{{event.entriesEvent}}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Inicio:</h6>
              <small class="text-muted"></small>
            </div>
            <span class="text-muted">{{event.startEvent}}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Fim</h6>
              <small class="text-muted"></small>
            </div>
            <span class="text-muted">{{event.endEvent}}</span>
          </li>
          <li v-if="event.priceEvent" class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Preço</h6>
              <small class="text-muted"></small>
            </div>
            <span class="text-muted">R$: {{event.priceEvent}}</span>
          </li>
        </ul>
        <form class="card p-2">
          <div class="input-group-append">
            <button type="submit" class="btn btn-primary btn-lg btn-block">Inscrever-se</button>
          </div>
        </form>
      </div>
      <div class="col-md-8 order-md-1">
        <img
          src="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
          class="card-img-top"
        />
        <p class="mb-3 mt-3">{{event.descriptionEvent}}</p>
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Endereço</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">{{address.streetAddress}}</h6>
              <small v-if="address.complementAddress" class="text-muted">{{address.complementAddress}}</small>
            </div>
            <span class="text-muted">{{address.numberAddress}}</span>
          </li>
          <li v-if="address.descriptionAddress" class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Descrição</h6>
              <small class="text-muted">{{address.descriptionAddress}}</small>
            </div>
            <span class="text-muted">...</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../axios/authAxios";

export default {
    data(){
        return {
            event: {
                idEvent: "",
                titleEvent: "",
                subtitleEvent: "",
                descriptionEvent: "",
                entriesEvent: "",
                startEvent: "",
                endEvent: "",
                priceEvent: ""
            },
            address: {
                idAddress: "",
                streetAddress: "",
                numberAddress: "",
                complementAddress: "",
                descriptionAddress: ""
            }
        }
    },
    methods: {
        async getInfoById(){
            try{
                const res = await axios.get("evento", {params: {idEvent: this.idEvent}});
                console.log(res);
                this.event.idEvent = res.data.data[0].idEvent;
                this.event.titleEvent = res.data.data[0].titleEvent;
                this.event.subtitleEvent = res.data.data[0].subtitleEvent;
                this.event.descriptionEvent = res.data.data[0].descriptionEvent;
                this.event.entriesEvent = res.data.data[0].entriesEvent;
                this.event.startEvent = res.data.data[0].startEvent;
                this.event.endEvent = res.data.data[0].endEvent;
                this.event.priceEven = res.data.data[0].priceEven;


                this.address.idAddress = res.data.data[0].idAddress;
                this.address.streetAddress = res.data.data[0].streetAddress;
                this.address.numberAddress = res.data.data[0].numberAddress;
                this.address.complementAddress = res.data.data[0].complementAddress;
                this.address.descriptionAddres = res.data.data[0].descriptionAddres;


            }
            catch(err){
                console.log(err);
            }
        }
    },

    created(){
        this.idEvent = this.$route.params.idEvent;
        this.getInfoById();
        
        console.log(this.event);
        console.log(this.address);
        //TODO verificar se o id do evento é valido;
    }
};
</script>

<style>
</style>