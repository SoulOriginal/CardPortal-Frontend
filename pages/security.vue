<template>
  <div>
    <v-app>
      <v-main v-if="locale && locale == 'ru'">
        <v-row>
          <v-col cols="12" md="6" lg="6">
            <v-container fluid fill-height
              ><v-layout class="align-center justify-center">
                <div>
                  <h1>Пельмени и полуфабрикаты</h1>
                  <p>
                    Наиболее демократичный и быстрый способ накрыть на стол.
                  </p>
                </div>
              </v-layout>
            </v-container>
          </v-col>

          <v-col cols="12" md="6" lg="6"
            ><v-img contain src="getman-imges/6.jpg"> </v-img
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12" lg="4">
            <v-icon color="black" size="40" class="mb-2"
              >mdi-food-drumstick</v-icon
            >
            <v-card elevation="0">
              Принято считать, что главным показателем качества пельменей – это
              соотношение тесто-фарш. При этом, чем больше фарша, тем добротнее
              продукт. И действительно, по классической рецептуре, в сырых
              пельменях соотношение теста и фарша регламентировано как 50 на 50
              процентов
            </v-card>
          </v-col>
          <v-col cols="12" md="12" lg="4">
            <v-icon color="black" size="40" class="mb-2">mdi-percent</v-icon>
            <v-card elevation="0">
              А вот в процессе варки тесто разваривается, а мясо уваривается.
              Поэтому соотношение тесто-фарш может измениться до 65% к 35%,
              иногда и больше в сторону увеличения массы теста. Именно поэтому
              показатель качественных пельменей, хинкалей так высок.
            </v-card>
          </v-col>
          <v-col cols="12" md="12" lg="4">
            <v-icon color="black" size="40" class="mb-2">mdi-snowflake</v-icon>
            <v-card elevation="0">
              Современные технологии заморозки сохраняют полезные вещества и
              витамины в полуфабрикатах и замороженных продуктах. Процесс
              замораживания происходит двумя способами: шоковым при -60°С
              холодным воздухом при -40°С.
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" lg="6">
            <v-container fluid fill-height
              ><v-layout class="align-center justify-center">
                <div>
                  <h1>
                    В наших продуктах не используются заменители мяса и добавки
                    Мы следим за высоким качеством сырья.
                  </h1>
                  <p>Мы следим за высоким качеством сырья.</p>
                </div>
              </v-layout>
            </v-container>
          </v-col>

          <v-col cols="12" md="6" lg="6"
            ><v-img contain src="getman-imges/5.jpg"> </v-img
          ></v-col>
        </v-row>
        <!-- <v-container fluid fill-height class="hero">
          <v-layout class="align-center justify-center">
            <v-card
              elevation="10"
              class="pa-3"
              background="#ffffff47"
              v-if="locale == 'pl'"
            >
              Pielmieni ta chinkali to dobry pomysł na smaczny ta szybki obiad.
              Głównym wskaźnikiem jest jakość używanych składników oraz stosunek
              ciasta do mięsa. Jednocześnie im więcej mięsa, tym bardziej
              solidny produkt. Nowoczesne technologie zamrażania które
              stosujemy, zachowują korzystne substancje i witaminy w produktach.
              Proces zamrażania odbywa się w sposób szokowy przy temperaturze
              -60°C. Przestrzegane są wszystkie zasady zamrażania i
              przechowywania. Dzięki czemu nasi klienci dostają świeże ta
              bezpieczne produkty. W naszych produktach nie stosuje się
              substytutów mięsa i dodatków, dbamy o wysoką jakość surowców.
              Dzięki temu że produkt jest przechowywany w postaci zamrożonej,
              zapewnia to dobrą jakość i bezpieczeństwo po ugotowaniu..</v-card
            >
            <v-card
              elevation="10"
              class="pa-3"
              background="#ffffff47"
              v-if="locale == 'ru'"
            >
              Пельмени и полуфабрикаты – демократичный и быстрый способ накрыть
              на стол. Принято считать, что главным показателем качества
              пельменей – это соотношение тесто-фарш. При этом, чем больше
              фарша, тем добротнее продукт. И действительно, по классической
              рецептуре, в сырых пельменях соотношение теста и фарша
              регламентировано как 50 на 50 процентов. А вот в процессе варки
              тесто разваривается, а мясо уваривается. Поэтому соотношение
              тесто-фарш может измениться до 65% к 35%, иногда и больше в
              сторону увеличения массы теста. Именно поэтому показатель
              качественных пельменей, хинкалей. Современные технологии заморозки
              сохраняют полезные вещества и витамины в полуфабрикатах и
              замороженных продуктах. Процесс замораживания происходит двумя
              способами: шоковым при -60°С или холодным воздухом при -40°С.
              Продукты будут свежими, если соблюдены все правила заморозки и
              хранения. В наших продуктах не используются заменители мяса и
              добавки, мы следим за высоким качеством сырья. Продукт храниться в
              замороженном виде, что обеспечивает хорошее качество и
              безопасность после приготовления и употребления.</v-card
            >
          </v-layout>
        </v-container> -->
      </v-main>
      <v-main v-if="locale && locale == 'pl'">
        <v-row>
          <v-col cols="12" md="6" lg="6">
            <v-container fluid fill-height
              ><v-layout class="align-center justify-center">
                <div>
                  <h1>Pierogi i półprodukty</h1>
                  <p>
                    Najbardziej demokratyczny i najszybszy sposób na nakrycie
                    stołu.
                  </p>
                </div>
              </v-layout>
            </v-container>
          </v-col>

          <v-col cols="12" md="6" lg="6"
            ><v-img contain src="getman-imges/6.jpg"> </v-img
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12" lg="4">
            <v-icon color="black" size="40" class="mb-2"
              >mdi-food-drumstick</v-icon
            >
            <v-card elevation="0">
              Powszechnie przyjmuje się, że głównym wskaźnikiem jakości pierogów
              jest stosunek ciasta do mięsa. Jednocześnie im więcej farszu, tym
              lepiej produkt. I rzeczywiście, według klasycznej receptury, na
              surowo pierogi, proporcja ciasta i mięsa mielonego jest regulowana
              od 50 do 50 procent
            </v-card>
          </v-col>
          <v-col cols="12" md="12" lg="4">
            <v-icon color="black" size="40" class="mb-2">mdi-percent</v-icon>
            <v-card elevation="0">
              Ale w trakcie gotowania ciasto gotuje się na miękko, a mięso
              gotuje. Dlatego stosunek mięsa mielonego może zmienić się od 65%
              do 35%, czasami bardziej w kierunku zwiększenia masy ciasta.
              Dlatego wskaźnik jakości pierogów, chinkali jest tak wysoki.
            </v-card>
          </v-col>
          <v-col cols="12" md="12" lg="4">
            <v-icon color="black" size="40" class="mb-2">mdi-snowflake</v-icon>
            <v-card elevation="0">
              Nowoczesne technologie zamrażania chronią przydatne substancje i
              witaminy w półproduktach i mrożonkach. Proces zamrażanie następuje
              na dwa sposoby: szok w temperaturze -60 ° C zimne powietrze o
              temperaturze -40°C.
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6" lg="6">
            <v-container fluid fill-height
              ><v-layout class="align-center justify-center">
                <div>
                  <h1>
                    W naszych produktach nie stosujemy żadnych substytutów mięsa
                    ani dodatków Monitorujemy wysoką jakość surowców.
                  </h1>
                  <p>Monitorujemy wysoką jakość surowców.</p>
                </div>
              </v-layout>
            </v-container>
          </v-col>

          <v-col cols="12" md="6" lg="6"
            ><v-img contain src="getman-imges/5.jpg"> </v-img
          ></v-col>
        </v-row>
      </v-main>
      <v-main v-else> Error </v-main>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  layout: "home",
  computed: mapGetters({
    locale: "lang/locale",
  }),
};
</script>

<style lang="scss" scoped>
.hero {
  background: url(/VectorLogo.svg);
  background-size: contain;
  background-repeat: no-repeat, repeat;
  background-position: center;
}
</style>
