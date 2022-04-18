<template>
  <div>
    <v-row id="main" no-gutters class="pb-7 pt-7">
      <v-col cols="12" md="6" class="fcc">
        <v-card class="rounded-xl pa-3 fcc" width="460" elevation="0">
          <h1>Цените своё время и деньги</h1>
          <no-ssr>
            <h4>
              <vue-typer
                :text="[
                  'Избавьтесь от необходимости тратить тысячи часов напоиск и выпуск карт.',
                  'Виртуальные карты для вашего бизнеса',
                ]"
                :repeat="Infinity"
                :shuffle="true"
                initial-action="typing"
                :pre-type-delay="70"
                :type-delay="130"
                :pre-erase-delay="2000"
                :erase-delay="250"
                erase-style="select-all"
                :erase-on-complete="true"
                caret-animation="expand"
              ></vue-typer>
            </h4>
            <v-btn color="#2c60f5" class="mt-12 white--text" to="register"
              >Создайте аккаунт</v-btn
            >
          </no-ssr>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" align="center" class="mt-4">
        <v-img
          v-if="$vuetify.breakpoint.width < 960"
          width="400"
          src="1.svg"
        ></v-img>
        <div v-else class="gradient-anim">
          <div class="card">
            <div class="face front">
              <h3 class="debit">CardPortal</h3>
              <h3 class="bank">
                <no-ssr>
                  <vue-typer
                    :text="['VISA', `MASTERCARD`]"
                    :repeat="Infinity"
                    initial-action="typing"
                    :pre-type-delay="70"
                    :type-delay="130"
                    :pre-erase-delay="2000"
                    :erase-delay="250"
                    erase-style="select-all"
                    :erase-on-complete="true"
                    caret-animation="expand"
                  ></vue-typer>
                </no-ssr>
              </h3>
              <img class="chip" src="chip.png" alt="chip" />
              <h3 class="number">
                <vue-typer
                  :text="[
                    '1357 7568 3338 9956',
                    '2256 8558 8458 4545',
                    '5564 8238 6458 4445',
                    '8858 8834 2235 2098',
                    '2202 2020 2210 3400',
                    '0000 0000 0000 0001',
                    '2000 0002 0000 0002',
                  ]"
                  :repeat="Infinity"
                  :shuffle="true"
                  initial-action="typing"
                  :pre-type-delay="70"
                  :type-delay="130"
                  :pre-erase-delay="2000"
                  :erase-delay="250"
                  erase-style="select-all"
                  :erase-on-complete="true"
                  caret-animation="expand"
                ></vue-typer>
              </h3>
              <h5 class="valid">
                <span
                  >VALID <br />
                  THRU</span
                ><span>
                  <no-ssr>
                    <vue-typer
                      :text="[
                        '10/28  ',
                        '10/11  ',
                        '10/16  ',
                        '10/11  ',
                        '07/30  ',
                      ]"
                      :repeat="Infinity"
                      initial-action="typing"
                      :pre-type-delay="70"
                      :type-delay="130"
                      :pre-erase-delay="2000"
                      :erase-delay="250"
                      erase-style="select-all"
                      :erase-on-complete="true"
                      caret-animation="expand"
                    ></vue-typer>
                  </no-ssr>
                </span>
              </h5>
              <!-- <h5 class="card-holder">jQueryScript</h5> -->
            </div>
            <div class="face back">
              <div class="blackbar"></div>
              <div class="cvvtext">
                <div class="white-bar">
                  <div class="cvv">???</div>
                </div>
              </div>
              <!-- <p class="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              quis ex nec nulla posuere sollicitudin. Proin nec orci at est
              pellentesque malesuada eu a neque. Maecenas quis porttitor odio.
              Praesent faucibus dui nisl, ac luctus mauris pulvinar in. Morbi
              vitae ante a nunc ullamcorper rutrum. Donec non interdum purus,
              gravida elementum mi.
            </p> -->
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
    <v-col cols="11" id="main2" style="margin: 0 auto">
      <v-row no-gutters>
        <v-col cols="12" md="6" lg="4" class="mt-3">
          <v-icon color="#7067D8" size="50">mdi-cash-multiple</v-icon>
          <h3 class="h3-blue">Более 12 эмитентов карт</h3>
          <h5 class="mt-2 font-weight-regular text-md-body-1">
            Избавьтесь от необходимости тратить тысячи часов на поиск и
            получение карт у десятков резных поставщиков, мы собрали для вас всё
            необходимое в одном месте.
          </h5>
        </v-col>
        <v-col cols="12" md="6" lg="4" class="mt-3">
          <v-icon color="#7067D8" size="44"
            >mdi-credit-card-multiple-outline</v-icon
          >
          <h4 class="h3-blue">Разнообразие карт</h4>
          <h5 class="mt-2 font-weight-regular text-md-body-1">
            Выпускайте карты различных ГЕО где и когда захотите. Всё для того,
            чтобы платежи вашей кампании проходили гладко.
          </h5>
        </v-col>
        <v-col cols="12" md="12" lg="4" class="mt-3">
          <v-icon color="#7067D8" size="44">mdi-timer-sand</v-icon>
          <h4 class="h3-blue">Цените своё время и деньги</h4>
          <h5 class="mt-2 font-weight-regular text-md-body-1">
            Избавьтесь от тысяч часов, потраченных на поиск и выпуск карт.
          </h5>
        </v-col>
      </v-row>
    </v-col>
    <v-row id="main3">
      <v-col cols="12" md="6" align="center" justify="center">
        <div class="device device-iphone-x">
          <div class="device-frame">
            <div class="device-content"></div>
          </div>
          <div class="device-stripe"></div>
          <div class="device-header">
            <div class="device-sensors"></div>
          </div>
          <div class="device-btns"></div>
          <div class="device-power"></div>
        </div>
      </v-col>
      <v-col cols="12" md="6">
        <h1 class="mt-9 h3-blue">Кто мы?</h1>
        <p style="font-size: 20px">
          Это онлайн магазин цифровых товаров. Цифровым товаром являются
          текстовые данные. Это сервис для продажи подарочных предоплаченных
          виртуальных карт для артбитражников и вебмастеров. Каждая карта имеет
          уже на своём балансе определённую сумму. Карты в продаже могут быть
          разного номинала.
        </p>
        <v-btn
          height="60"
          rounded
          to="register"
          color="#41aaa9"
          class="text-capitalize white--text text-normal pl-12 pr-12"
        >
          <h3>Создать бизнес-аккаунт</h3>

          <v-icon class="ml-2">mdi-arrow-right-bold</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row id="main4">
      <v-col cols="12" md="6">
        <h1 class="mt-9 big-text h3-blue">
          Международная виртуальная подарочная карта
        </h1>
        <p style="font-size: 20px">
          Подарочная карта CardPortal — это международная подарочная карта,
          которую можно не только использовать по всему миру, но и дарить по
          всему миру. Это делает CardPortal уникальным!
        </p>
      </v-col>
      <v-col cols="12" md="6" align="center" justify="center">
        <v-img src="2.png" lazy-src="2.png"></v-img>
      </v-col>
    </v-row>
    <!-- <div class="container">
      <div class="row text-center">
        <div class="col-md-2">1</div>
        <div class="col-md-2">1</div>
        <div class="col-md-2">1</div>
        <div class="col-md-2">1</div>
        <div class="col-md-2">1</div>
      </div>
      <div class="row text-center">
        <div class="col-md-2">2</div>
        <div class="col-md-2">2</div>
        <div class="col-md-2">2</div>
        <div class="col-md-2">2</div>
        <div class="col-md-2">2</div>
      </div>
    </div> -->
    <h1 class="big-text text-center">Закупайте трафик где-угодно</h1>
    <v-card elevation="6" class="pt-6 pb-6" id="main5">
      <v-row no-gutters align="center" justify="space-around">
        <v-col cols="12" md="4" style="display: contents">
          <v-card class="pa-3 ml-md-3" elevation="0">
            <v-img width="250" src="2.svg">
              <template v-slot:default>
                <div class="image--slot">
                  <v-icon color="white">mdi-instagram</v-icon>
                </div>
              </template>
            </v-img></v-card
          >
        </v-col>
        <v-col cols="12" md="4" style="display: contents">
          <v-card class="pa-3 ml-md-3" elevation="0">
            <v-img width="250" src="2.svg">
              <template v-slot:default>
                <div class="image--slot">
                  <v-icon color="white">mdi-facebook</v-icon>
                </div>
              </template>
            </v-img></v-card
          >
        </v-col>
        <v-col cols="12" md="4" style="display: contents">
          <v-card class="pa-3 ml-md-3" elevation="0">
            <v-img width="250" src="2.svg">
              <template v-slot:default>
                <div class="image--slot">
                  <v-icon color="white">mdi-youtube</v-icon>
                </div>
              </template>
            </v-img></v-card
          >
        </v-col>
      </v-row>
      <v-row no-gutters class="mt-4" align="center" justify="space-around">
        <v-col cols="12" md="4" style="display: contents">
          <v-card class="pa-3 ml-md-3" elevation="0">
            <v-img width="250" src="2.svg">
              <template v-slot:default>
                <div class="image--slot">
                  <v-icon color="white">mdi-linkedin</v-icon>
                </div>
              </template>
            </v-img></v-card
          >
        </v-col>
        <v-col cols="12" md="4" style="display: contents">
          <v-card class="pa-3 ml-md-3" elevation="0">
            <v-img width="250" src="2.svg">
              <template v-slot:default>
                <div class="image--slot">
                  <v-icon color="white">mdi-google-plus</v-icon>
                </div>
              </template>
            </v-img></v-card
          >
        </v-col>
        <v-col cols="12" md="4" style="display: contents">
          <v-card class="pa-3 ml-md-3" elevation="0">
            <v-img width="250" src="2.svg">
              <template v-slot:default>
                <div class="image--slot">
                  <v-icon color="white">mdi-twitter</v-icon>
                </div>
              </template>
            </v-img></v-card
          >
        </v-col>
      </v-row>
    </v-card>

    <v-row id="main6">
      <v-col cols="12" md="6" align="center" justify="center">
        <v-img
          src="CloudDB-HeroSecuriteAvancer@2x_0.png"
          lazy-src="CloudDB-HeroSecuriteAvancer@2x_0.png"
        ></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <h1 class="mt-9 big-text">Безопасность покупок в сети</h1>
        <p style="font-size: 20px">
          Виртуальные платежные являются цифровым аналогом привычных пластиховых
          карт и разработаны специально для оплаты в интернете.Используя
          виртуальные карты при совершении расчетов в сети, вы можете не
          переживать за данные вышей основной карты.
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
if (process.browser) {
  var VueTyper = require("vue-typer").VueTyper;
}
// import { VueTyper } from "vue-typer";

export default {
  components: { VueTyper },
  layout: "home",
};
</script>

<style lang="scss">
.image--slot {
  padding: 5px;
  background: rgb(144, 0, 255);
  width: fit-content;
  border-radius: 10px;
}
.gradient-anim {
  display: inline-flex;
  border-radius: 15px;
  background: linear-gradient(
    294deg,
    #25c199,
    #8dc125,
    #e81a1a,
    #835353,
    #c4c7ec,
    #0b649f,
    #c4e6ec,
    #e8d000
  );
  background-size: 1600% 1600%;

  -webkit-animation: AnimationName 14s ease infinite;
  -moz-animation: AnimationName 14s ease infinite;
  -o-animation: AnimationName 14s ease infinite;
  animation: AnimationName 14s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 15%;
  }
  50% {
    background-position: 100% 86%;
  }
  100% {
    background-position: 0% 15%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 15%;
  }
  50% {
    background-position: 100% 86%;
  }
  100% {
    background-position: 0% 15%;
  }
}
@-o-keyframes AnimationName {
  0% {
    background-position: 0% 15%;
  }
  50% {
    background-position: 100% 86%;
  }
  100% {
    background-position: 0% 15%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 0% 15%;
  }
  50% {
    background-position: 100% 86%;
  }
  100% {
    background-position: 0% 15%;
  }
}
.fcc {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.big-text {
  font-size: 2.2rem;
  font-weight: 900;
  // line-height: 5.5rem;
}
.h3-blue {
  font-size: 28px;
  color: #7067d8;
}
/* body {
  display: flex;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
  -webkit-align-items: center;
  -webkit-justify-content: center;
  background-image: linear-gradient(
    to right top,
    #a2beeb,
    #8ecfee,
    #8edde5,
    #a4e7d5,
    #c7eec7
  );
  flex-direction: column;
  -webkit-flex-direction: column;
} */
.card {
  position: relative;
  width: 508px;
  height: 314px;
  transform-style: preserve-3d;
  perspective: 500px;
  z-index: 1;
  border-radius: 15px;
}
.card .face {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 15px 15px rgba(0, 0, 0, 0.5);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(28px);
  transform-style: preserve-3d;
  transition: 1s;
  backface-visibility: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.card:hover .face.front {
  transform: rotateY(180deg);
}
.card .face.back {
  transform: rotateY(180deg);
}
.card:hover .face.back {
  transform: rotateY(360deg);
}
.card .face.front::before {
  content: "";
  position: absolute;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.5;
}
.card .face.front::after {
  content: "";
  position: absolute;
  bottom: 40px;
  right: 80px;
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50%;
  opacity: 0.7;
}
.card .face.front .debit {
  position: absolute;
  left: 40px;
  top: 30px;
  color: #fff;
  font-weight: 500;
}
.card .face.front .bank {
  position: absolute;
  right: 40px;
  top: 25px;
  color: #fff;
  font-weight: 500;
  font-style: italic;
  font-size: 24px;
}
.card .face.front .chip {
  position: absolute;
  top: 80px;
  left: 50px;
  max-width: 64px;
}
.card .face.front .number {
  position: absolute;
  bottom: 130px;
  left: 40px;
  color: #fff;
  font-weight: 500;
  letter-spacing: 6px;
  font-size: 18px;
  text-shadow: 0 2px 1px #0005;
  font-family: "Orbitron", sans-serif;
}
.card .face.front .valid {
  position: absolute;
  bottom: 90px;
  left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 300;
  line-height: 1em;
  text-align: right;
}
.card .face.front .valid span:last-child {
  margin-left: 20px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 2px;
}
.card .face.front .card-holder {
  position: absolute;
  bottom: 40px;
  left: 40px;
  color: #fff;
  font-weight: 300;
  font-size: 16px;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.card .face.back .blackbar {
  position: absolute;
  top: 40px;
  width: 100%;
  height: 60px;
  background: #000;
}
.card .face.back .cvvtext {
  position: absolute;
  top: 120px;
  left: 30px;
}
.card .face.back .cvvtext .white-bar {
  position: relative;
  width: 400px;
  height: 40px;
  background: #fff;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.card .face.back .cvvtext .cvv {
  position: relative;
  margin-right: 5px;
  background: #ccc;
  color: #111;
  width: 50px;
  height: 30px;
  font-weight: 600;
  letter-spacing: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card .face.back .text {
  position: absolute;
  bottom: 30px;
  left: 30px;
  right: 30px;
  color: #fff;
  font-size: 10px;
  line-height: 1 4em;
  font-weight: 300;
}
//
.device,
.device::before,
.device::after,
.device *,
.device *::before,
.device *::after {
  box-sizing: border-box;
  display: block;
}
.device {
  position: relative;
  margin: 30px auto;
}
.device .device-frame {
  z-index: 1;
}
.device-iphone-x {
  height: 694px;
  width: 342px;
}
.device-iphone-x .device-frame {
  background: #222;
  border-radius: 54px;
  box-shadow: inset 0 0 0 2px #606467, inset 0 0 0 6px #e2e3e4;
  height: 694px;
  padding: 22px;
  width: 342px;
}
.device-iphone-x .device-content {
  background-color: #fff;
  background-image: url("https://designersrepo.com/wp-content/uploads/2021/01/cards-r45.jpg");
  background-position: center center;
  background-size: cover;
  border-radius: 32px;
  height: 650px;
  position: relative;
  width: 300px;
  -webkit-animation: AnimationName 14s ease infinite;
  -moz-animation: AnimationName 14s ease infinite;
  -o-animation: AnimationName 14s ease infinite;
  animation: AnimationName 14s ease infinite;
}
.device-iphone-x .device-stripe::after,
.device-iphone-x .device-stripe::before {
  border: solid rgba(51, 51, 51, 0.25);
  border-width: 0 6px;
  content: "";
  height: 5px;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 9;
}
.device-iphone-x .device-stripe::after {
  top: 68px;
}
.device-iphone-x .device-stripe::before {
  bottom: 68px;
}
.device-iphone-x .device-header {
  background: #222;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  height: 24px;
  left: 50%;
  margin-left: -82px;
  position: absolute;
  top: 22px;
  width: 164px;
  z-index: 10;
}
.device-iphone-x .device-header::after,
.device-iphone-x .device-header::before {
  content: "";
  height: 6px;
  position: absolute;
  top: 0;
  width: 6px;
}
.device-iphone-x .device-header::after {
  background: radial-gradient(
    circle at bottom left,
    transparent 0,
    transparent 75%,
    #222 75%,
    #222 100%
  );
  left: -6px;
}
.device-iphone-x .device-header::before {
  background: radial-gradient(
    circle at bottom right,
    transparent 0,
    transparent 75%,
    #222 75%,
    #222 100%
  );
  right: -6px;
}
.device-iphone-x .device-sensors::after,
.device-iphone-x .device-sensors::before {
  content: "";
  position: absolute;
}
.device-iphone-x .device-sensors::after {
  background: #444;
  border-radius: 2.5px;
  height: 5px;
  left: 50%;
  margin-left: -20px;
  top: 4px;
  width: 40px;
}
.device-iphone-x .device-sensors::before {
  background: #444;
  border-radius: 50%;
  height: 11px;
  left: 50%;
  margin-left: 30px;
  top: 1px;
  width: 11px;
}
.device-iphone-x .device-btns {
  background: #606467;
  height: 26px;
  left: -2px;
  position: absolute;
  top: 92px;
  width: 3px;
}
.device-iphone-x .device-btns::after,
.device-iphone-x .device-btns::before {
  background: #606467;
  content: "";
  height: 50px;
  left: 0;
  position: absolute;
  width: 3px;
}
.device-iphone-x .device-btns::after {
  top: 48px;
}
.device-iphone-x .device-btns::before {
  top: 112px;
}
.device-iphone-x .device-power {
  background: #606467;
  height: 80px;
  position: absolute;
  right: -2px;
  top: 160px;
  width: 3px;
}
</style>
