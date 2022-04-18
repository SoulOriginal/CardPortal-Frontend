<template>
  <v-row v-if="locale == 'pl'">
    <v-btn @click="drawer = !drawer" fixed class="ma-3" fab dark color="teal">
      <v-icon dark> mdi-format-list-bulleted-square </v-icon>
    </v-btn>
    <v-navigation-drawer v-model="drawer" fixed bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item
            v-for="(item, i) in odcinki"
            :key="i"
            @click="$vuetify.goTo(`#odc_${i}`)"
          >
            <v-list-item-title>
              <span class="ml-1 mr-1">{{ i + 1 }}</span
              >{{ item.title }}</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-timeline class="timeline" v-if="$vuetify.breakpoint.width >= 960">
      <v-timeline-item
        v-for="(n, index) in odcinki"
        :key="n"
        :id="`odc_` + index"
        color="red lighten-2"
        fill-dot
      >
        <template v-slot:opposite>
          <v-img max-height="800" max-width="400" :src="n.image_url"></v-img>
        </template>
        <v-card class="elevation-2">
          <v-card-title> {{ n.title }} </v-card-title>
          <v-card-text>
            {{ n.text }}
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <div v-else>
      <v-card
        v-for="(n, index) in odcinki"
        :key="n + '_mini'"
        :id="`odc_` + index"
        class="mt-3 pa-3"
      >
        <v-row align="center" justify="center">
          <v-card-title>{{ n.title }}</v-card-title></v-row
        >
        <v-row align="center" justify="center">
          <v-img
            center
            max-height="300"
            max-width="500"
            :src="n.image_url"
          ></v-img>
        </v-row>

        <v-card-text>
          {{ n.text }}
        </v-card-text>
      </v-card>
    </div>
  </v-row>
  <div v-else>
    <v-container
      bg
      fill-height
      grid-list-md
      text-xs-center
      style="width: 100vh !important; height: 100vh"
    >
      <v-layout row wrap align-center>
        <v-row align="center" justify="center">
          <v-card class="pa-4" elevation="5">
            <v-col
              >Полная версия истории компании только на Польском языке</v-col
            >

            <v-col cols="12">
              <v-row align="center" justify="center">
                <LocaleDropdown />
              </v-row>
            </v-col>
          </v-card>
        </v-row>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LocaleDropdown from "@/components/LocaleDropdown";
export default {
  layout: "home",
  computed: mapGetters({
    locale: "lang/locale",
  }),
  components: {
    LocaleDropdown,
  },
  data() {
    return {
      drawer: true,
      odcinki: [
        {
          text: "Był rok 2013. Gwałtowne wydarzenia społeczno-polityczne na wschodzie Ukrainy z tego okresu wskazywały na szybki koniec rzeczywistości, jaką znałem od wielu lat. Nie był to kolejny kryzys, który podzieliłby moje dochody na pół. Wszystko wskazywało na to, że wynik kolejnych działań związanych z rozliczaniem ówczesnej ukraińskiej władzy miał w moim przypadku wynieść 0. To bardzo okrągła liczba.Kwiecień 2014 roku spędziłem w Warszawie: chodziłem, oglądałem... Zwiedziłem też Kraków i Radom.Maj 2014 r. przyniósł najgorszą w moim życiu wiadomość – nie mam gdzie i do czego wracać. Nie mam nawet po co wracać! Wszystko, co miałem, wszystko, co stworzyłem, nad czym pracowałem przez 25 lat, zamieniło się w proch! Trzy najlepsze warsztaty samochodowe oraz ogromny dom w centrum miasta zostały zniszczone, rozkradzione i przejęte przez nieproszonych gości (to bardzo kulturalne określenie dla rozwydrzonych hord, które obróciły cały mój majątek w perzynę).Miałem 48 lat. Z całego mojego majątku ruchomego został tylko samochód Porsche Cayenne oraz niewielkie oszczędności.Luksusowe Porsche mnie nie nakarmi i nie zapewni mi ciepłego, domowego kąta. To raczej ja muszę dbać, aby auto miało paliwo i opłacone ubezpieczenia. Co robić dalej?... Jak żyć z niewielkiej sumy, która mi pozostała?...",
          title: "Od milionera do zera",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/132570617_1558004357740662_8300306096339979327_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_ohc=aVV4jUM6aK4AX_2IsxA&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT8gzOos9ziO1Ja6fAqqLcQliMZ5he3nvy68z8Kd8zC0mQ&oe=62029AE3",
        },
        {
          text: "Życie mnie nauczyło, że jeśli upadniesz, to trzeba się podnieść i iść dalej. Dlatego moja decyzja po stracie prawie wszystkiego, co miałem, była błyskawiczna – wracam do Kijowa, sprzedaję samochód, kupuję tańszy i wyprowadzam się na zawsze z Ukrainy.  Mówisz i masz! Ale nie tak prędko... Kilka miesięcy lata minęło, zanim sprzedałem mój markowy bolid. Z ogromnym wysiłkiem udało mi się dostać połowę ceny wyjściowej – nabywca się cieszył, a ja myślałem, że serce mi pęknie!Moją następną „bryką” stał się Renault Cangoo – kosztował mnie sześć tysięcy amerykańskich dolarów. Ktoś powie: zamienił stryjek siekierkę na kijek, ale ja poczułem się po tej transakcji wolny.Zatem, żegnaj Ukraino, wyjeżdżam na zawsze! Obrałem kierunek na zachód. Mój cel nazywał się Polska. Co miałbym tam robić, jeszcze nie wiedziałem. ",
          title: "Najlepsza decyzja w życiu ",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/133844283_1559405174267247_8738573110298618095_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=KoO-m0wGKnkAX-NEEZv&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT-p9JZB815loP6ky_t138-Hahl_86AZVIJa771AalhSKQ&oe=62049033",
        },
        {
          text: " Dotarłem do Polski. Nie jestem już w tym kraju bogatym turystą.😒 🏖️ Jestem teraz pospolitym emigrantem – jednym z wielu odważnych, którzy zdecydowali się postawić wszystko na jedną kartę, aby w życiu mieć wreszcie spokój, realizować marzenia i godziwie żyć. Na Ukrainie to nie było możliwe. Hotele pięciogwiazdkowe🌟🌟🌟🌟🌟 zamieniłem na tani hostel⭐. Tak zaczął się dla mnie jeden z najgorętszych okresów w życiu – oszczędzałem na wszystkim, szukałem mieszkania, zaliczałem kursy języka polskiego i poznawałem miasto, w którym zamieszkałem.Pomyślałem, że skoro zmieniłem kraj, to mogę zmienić również zawód.👨‍🍳 Nic nie stoi na przeszkodzie – i tak muszę przecież zaczynać od 0 (zera).Tyle tylko dobrego w złym, które się wydarzyło, że mam doświadczenie w rozpoczynaniu wszystkiego od nowa.🤹‍♂️🏋️‍♂️ Przechodziłem już przez podobną sytuację 22 lata temu – w moim ojczystym mieście – kiedy bez wychodzenia z domu przeprowadziłem się z ZSRR na Ukrainę. Stało się to w czasie, kiedy runął największy kolos na glinianych nogach, którego nosiła kiedykolwiek Ziemia – Związek Socjalistycznych Republik Radzieckich. Z tego upadku narodziły się samodzielne państwa. Jednym z nich była Ukraina.🇺🇦Wtedy mi – starszemu mechanikowi ogromnej kopalni węgla – pensji nie starczało nawet na jedzenie.👷🏽‍♂️To oczywiste, że chciałem lepszego życia. Każdy by chciał. Wiedziałem, że Polska dała mi szansę 👍– postanowiłem ją wykorzystać już pod koniec 2014 r. ...",
          title: "Jestem emigrantem i zaczynam od zera",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/p180x540/135091998_1560696144138150_5650097945574219518_n.png?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=JrNbGtv5tGMAX-8pdKr&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT8RfeHDgmTF3H4ZJ5b3UESeHaRD4JDKAkf6DAWAP-jZQg&oe=6204CC39",
        },
        {
          text: "W grudniu 2014 roku zdecydowałem się otworzyć punkt gastronomiczny🍛, o powierzchni 8 m2 w hali targowej Hala Mirowska. Choć miała to być niewielka firma, formalności konieczne do jej założenia okazały się gigantyczne!😱 Utworzenie firmy, wybór i remont lokalu, sanepid, kasa fiskalna, terminal, zapoznanie się z instrukcjami BHP... Wszystko to ciągnęło przez kilka miesięcy⏳, jednak nareszcie otworzyłem swój pierwszy punkt gastronomiczny w Warszawie.🧜‍♀️Nad menu długo nie myślałem. Swoje dzieciństwo spędziłem na przedmieściu Doniecka, w górniczym miasteczku, do którego wysłano kiedyś ludzi ze wszystkich republik radzieckich. Byli tam Gruzini, Tatarzy, Rosjanie, Uzbecy, Kazachowie, Koreańczycy. Ludzie z ponad 100 narodowości mieszkali razem.🧒🧑👧🧔👨‍🦱👫🏽🧑‍🦱👩‍🦱🧒👦👧👨 Mikser historii wymieszał kuchnie wszystkich narodów i dzięki temu doprowadził do powstania najlepszego menu z najlepszymi potrawami od każdego narodu.🍲🥘🥙🌯🥟🧆🥗🥘 W karcie dań figurowały chinkali z Gruzji, pielmieni z Sybiru, kimchi z Korei, czeburek od Tatarów Krymskich, piław z Uzbekistanu etc.Na witrynę trafiły natomiast różne sałatki, dipy, przekąski.🥗 Wszystko było pyszne i piękne. Mimo to ogromnego zainteresowania nie było. Zastanawiałem się, dlaczego.🧐🤔Pula pieniędzy rosła bardzo powoli i ledwo pokrywała wydatki. O dochodach nie było co marzyć. ☹Miejsce nie to...Wszystko toczyło się po równi pochyłej w dół...↘️⏬",
          title: "Z mechanika maszynowego – restaurator",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/s720x720/135138176_1562296073978157_5500067612924670201_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=730e14&_nc_ohc=iCY4deeABCkAX9RNSjD&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT9JW4NxalGOMV11TfBs7iAmIp2916uOTty-tFPN1RkoQw&oe=62050769",
        },
        {
          text: " Choć mój pierwszy lokal gastronomiczny nie odniósł sukcesu, pojawiło się jednak doświadczenie, które pomogło stworzyć udany punkt na Bio Bazarze oraz na jarmarku w Blue City.🙂💪Z końcem października 2015 roku świętowałem udane otwarcie swojej pierwszej, najprawdziwszej restauracji 🎂🍾🥂– nazwałem ją Chinkalia. Zaczęła działać na ul. Vogla 28, niedaleko od Pałacu Wilanowskiego.33 m2, otwarta, ale oddzielona od sali kuchnia z kilkoma stolikami. Metraż był ponad 4 razy większy❗ niż w moim pierwszym punkcie! Pogratulowałem sobie, że się rozwijam.🤝👍Do stałego jadłospisu restauracji Chinkalia weszły – a jakże ! – chinkali, pielmieni, pierogi, gołąbki, kotlety, dodatki, solianka, charczo i zestaw sałatek.Tu zysk był już od pierwszego dnia!💰Reakcja klientów na obce dla nich jedzenie była wspaniała.🙉Pojawiło się wtedy przekonanie, że wszystko będzie dobrze – jest punkt oparcia, więc można spokojnie rozwijać sieć, zapuszczać w Polsce korzenie i dojść do siebie po strasznych chwilach.Los pokazał, że źle mi się wydawało.☠😰...",
          title: "Chinkalia– moja pierwsza prawdziwa restauracja",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/s600x600/135583427_1563669930507438_1667565011626089230_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=k6ZGp1vBxHQAX-jgvPA&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT9MnE-nhZ2KLm5ziPhETTgw6tcMGX0UBslk-uYk0wCagQ&oe=62052D1B",
        },
        {
          text: "    Przekazałem zarządzanie restauracją partnerowi, a ja zacząłem szukać inwestorów na otwarcie następnego lokalu. Plan był dość prosty – otwarcie kilku restauracji🥙🥘🥘 i rozpoczęcie produkcji. Zapowiadała się wreszcie tak upragniona przeze mnie stabilizacja zawodowa i finansowa.W dość krótkim czasie okazało się, że jeszcze nie teraz, bo z kasy zaczęły znikać pieniądze...😕 W realizacji planu na stabilizację przeszkodziły głupota oraz chciwość mojego partnera. Ta druga była ogromna – partnerska rodzinka nie kradła bowiem części pieniędzy; oni kradli wszystko! 😱😱😱Ogromnej chęci do śledzenia złodziei oraz łapania ich za rękę nie miałem; poza tym – dotarło do mnie, że tego typu działalność nie pomoże w uruchomieniu produkcji na większą skalę.Życząc partnerowi w myślach szczęścia i zdrowia za ukradzione pieniądze, zacząłem chodzić po mieście👣, rozglądać się,👤 myśleć🤔, szukać wyjścia.🚶‍♂️ Trzy miesiące poszukiwań rozwiązania sytuacji – jak wtedy uważałem – bez wyjścia, zabrały ode mnie spokojny sen.🥺„Co dalej?” – pytałem siebie – „Co dalej?!”⁉️⁉️⁉️Odpowiedzi nie było. Kilka razy byłem na granicy załamania nerwowego...🥴🥶Aż wreszcie nadszedł dzień, w którym wstąpił we mnie optymizm!🤡...",
          title: "Partner o „lepkich rączkach”",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/p180x540/137060301_1565691796971918_3538880305311568172_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=730e14&_nc_ohc=GNW6O7LbkhQAX_iC-zP&_nc_oc=AQmbVldrIM43vFXyoM-RdiIGcI58Ryko3JGuFB9beidAOuLelwEaOTFtpVNm1mXLML0&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT8LCvOfHe6ZhrOq5SAUq7_DypLn9BXuxSpw7lKAtCkgcg&oe=6203DC54",
        },
        {
          text: " Nie wiem jak to się stało (chyba przyszło wsparcie z góry), jednak w kwietniu 2016 roku podjąłem decyzję o otwarciu produkcji bez własnej sieci sprzedaży. Miałem tylko ustne umowy🤝 z różnymi restauracjami na dostarczanie półproduktów. I znów chyba pomogło wsparcie Wszechświata – w dość krótkim czasie pojawiło się wszystko: inwestor👨‍💼, nowe przedsiębiorstwo, samochód z urządzeniem chłodniczym🚚 oraz idealny lokal do produkcji.Świetnie!🤩 Czułem, że wreszcie wszystko toczy się dobrze i z końcem maja wraz z ekipą będziemy startować jako producent i dostawca półproduktów. Oferta nie była uboga – zawierała około 16 potraw z mojego menu restauracyjnego.Skrzydła mi prawie urosły!🧚‍♂️I na starcie zostały podcięte – ze wszystkich punktów gastronomicznych, z którymi miałem umowę, tylko kilka zdecydowało się zamówić trochę produkcji, a inne – wcale.😟 Na otwarcie własnych lokali pieniędzy, niestety, brakowało. Przy posiadanych funduszach mogliśmy działać tylko w sektorze jedzenia ulicznego. Warszawski Targ Śniadaniowy pozwolił wejść na rynek z 4 naszymi produktami🥟🥠🥠🥟 – chinkali, pielmieni, czebureki i solianka. Niewiele, ale zawsze to coś.📈✅..",
          title: "(Skąpe) Uśmiechy Wszechświata ",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/s640x640/136395037_1567075976833500_5280479978988004801_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_ohc=nMYQndEc-ZUAX8i-hNe&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT_hGoo9vDRtWZu033X0R6w1muO3RslJ9g-mzD3K0AdrHQ&oe=62028DA1",
        },
        {
          text: " Weszliśmy na Targ Śniadaniowy, jednak przychody były słabe i działalność się nie opłacała.Powód?Artykuł jest nieznany.😕 Klienci przechodzili obok, niezainteresowani produktami pyszniącymi się na ladzie. Tymczasem chinkali i pielmieni🥟🥠🥠🥟 nie można położyć do bemaru – należy je jeść od razu po ugotowaniu, gdyż po jakimś czasie sok ze środka zostanie wchłonięty przez ciasto. Nie można ich też podgrzewać, bo gubią swój smak.Jak wyjaśnić ludziom, że to inny rodzaj pierogów? ❓❔❓❔Że ich technologia przygotowywania przyszła z Syberii, gdzie ponad pół roku trwają trzaskające mrozy?❓❔❓❔❓❔❓Tam miejscowi nauczyli się przechowywać mięso dzięki szybkiemu zamrażaniu. Zauważyli oni, że jeśli do świeżego mięsa mielonego dodać cebulę, pieprz, sól, trochę wody, zawinąć mały pierożek i szybko wynieść na mróz (mówi się, że mieszkańcy Syberii wyrzucali pielmieni na mróz przez małe okienko), to – po ugotowaniu pierogów – sok z mięsa nie wchłonie się w ciasto.Produkt można bez konserwacji przechowywać w zamrożeniu❄️ dosyć długo, a po ugotowaniu w środku zostaje wszystko, co najlepsze: cały sok, witaminy oraz smak.Rozwiązanie problemu znowu przyszło samo – wystarczyło postawić garnki do przodu🥘, tak, aby znalazły się bezpośrednio w zasięgu klienta. To był mały trik o ogromnym znaczeniu – przychody się zwiększyły!  Punkty jedzenia ulicznego trochę stabilizowały biznes. 💲💰💲💰W lipcu 2016 roku dostałem propozycję otwarcia restauracji.Oto droga do sukcesu!T.  ak, ale – jak pokazało życie – znów droga bardzo kręta.➰➰➰➰ Wybrany przez nas lokal z ulicy Poznańskiej nie spodobał się inwestorowi, który zdecydował się na lokal przy Metrze Świętokrzyska.Ruszyliśmy więc!W październiku jednak znów zamknęliśmy lokal – okazało się, że ludzie nie zawsze jedzą tam, gdzie chodzą. Wszystkie wydarzenia kolejny raz przemawiały za tym, że to – znowu – koniec. Nie stać nas było na opłatę za lokal – wiedziałem, że nie pociągniemy długo i biznes trzeba zamykać🚪. Przed nami zima, jedzenia ulicznego nie będzie...Znowu jednak szczęście do nas się uśmiechnęło 🌈– w ostatnim momencie prawie. Znalazł się bowiem pierwszy klient hurtowy na naszą sałatkę z bakłażana!😃...",
          title: "Filozofia pielmieni ",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/s600x600/138022369_1568531946687903_2150747161066676861_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_ohc=Fc0X_jx60G4AX8DIwMk&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT_KBdOKeRcV5U-FEYvTvWdMklFri7plqYq5Xw2FodbH2w&oe=62026815",
        },
        {
          text: " Targ Śniadaniowy po raz pierwszy zaczął sezon zimowy w Hali MZA. My też rozpoczęliśmy sezon – dostaliśmy zamówienie na produkcję antipasti.Sprzedaż udziału w restauracji Chinkalja, trochę stabilizowała naszą sytuację i dociągnęliśmy do początku letniego sezonu 2017 roku.Czerwiec 2017 roku przyniósł nam food court na hali Gwardii – 13 m2 dla nas!Nie można było nie skorzystać z takiej szansy. Problem w tym, że finansowo nie byliśmy na ten biznesowy skok przygotowani. Przecież dopiero co pozałatwialiśmy mniej więcej wszystko, a życie znowu zaproponowało ryzyko⚠️ i postawienie wszystkiego na jedną kartę. Wiedzieliśmy, że możemy zostać bez tego, o co tak ciężko walczyliśmy.Jednak – jak powiadają doświadczeni – lepiej zaryzykować i przegrać, niżeli przez całe życie żałować.Powiedzieliśmy Hali Gwardii „TAK” i... zamiast spokojnego życia zaczął się Armagedon!🌪⚡🌪💥🌪Przez 3 miesiące – nie wiadomo skąd – znajdowały się pieniądze na przetrwanie. Zadłużone były mieszkania i lokal produkcyjny, a remonty robiliśmy własnymi rękoma. Znowu znalazłem się na granicy psychicznej wytrzymałości.🥶🤕🤑  29 września 2017 roku był wielkim dniem otwarcia naszego biznesu. Decydował się nasz los – w zamrażalniku mieliśmy 250 kg produkcji, i... tyle – więcej nie mieliśmy.Otwarcie i... BINGO! ‼️‼️‼️Wygraliśmy!Nasza koncepcja się spodobała – widzieliśmy po obrocie, że przynosi zadowolenie klientom.🌈W nowy 2018 rok weszliśmy z ustabilizowaną sytuacją finansową 💲💲💲💲💲🥂– zadłużenie zostało spłacone, a my zaczęliśmy przygotowanie do sprzedaży franczyz.📈📊🛒...",
          title: " BINGO!‼‼‼ ",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/p180x540/139081106_1571217449752686_822540674007623000_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=730e14&_nc_ohc=qmyhCLczy3kAX8gmSYj&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT_ezJ9HjtzBzswx4BZi3TvyZH1zp8FWRrvaSzcSTItr_g&oe=6204FC5F",
        },
        {
          text: "   Mamy świetny produkt👌, udaną koncepcję👉. Głupotą jest nie sprzedawać franczyzy. O przygotowanie dokumentów zwróciliśmy się do fachowców😎. Pięknie opowiadali✌, dużo obiecali🙉, w końcu wszystko wyszło, jak zwykle🥴. Fachowcy okazali się „fachowcami”. Zapłaciliśmy za pierwszą część pracy, wszystko się przeciągało, zdecydowaliśmy się zrezygnować z ich usług❌. Morał z tej historyjki jest prosty i oczywisty: chcesz zrobić dobrze, zrób to sam🚹.I wtedy spontanicznie zrodził się pomysł zorganizowania eventu🥳🫖🍽🫕, wydarzenia na miarę niezwykłych pierogów🥟🥟🥟🥟 – Dnia Pielmienia na Hali Gwardia. No i się zaczęło: umów się na wycieczkę🏕, nakręć dobry materiał wideo, wykonaj piękne opakowanie do naszej oferty...🎁Na Dzień Pielmienia wybraliśmy 14 kwietnia 2018 roku. Pierwsza sobota po prawosławnej Wielkanocy. Katolicka przypadała, odpowiednio, tydzień wcześniej.Wybraliśmy zgrany zespół asystentów🙍‍♂️💁‍♀️👦👧. Miesiąc przygotowań. Zaprosiliśmy gości na uroczystość, zrobiliśmy reklamę w sieciach społecznościowych, na Hali Gwardia. Obniżyliśmy cenę na pielmieni o 75% ‼️‼️‼️wartości na czas wydarzenia.Działo się, że hej!Nadszedł wreszcie 14 kwietnia. I wtedy dopiero się zadziało!Hala Gwardii nigdy nie widziała takiej kolejki do naszej knajpy.🚶‍♂️🚶‍♀️🚶🚶‍♂️🚶‍♀️🚶 Znad garnków unosiła się para i zapachy, które zapowiadały niesamowitą rozkosz kosztowania pielmieni. Ludzie czekali, nie rezygnując z przyjemności poznania smaku aromatycznego i świeżutkiego dania🫕.W jeden dzień sprzedaliśmy ponad 1600 porcji pielmieni!Tak, to był absolutnie udany event na miarę naszych niezwykłych pierogów!🥟🥟🥟Na rezultaty nie czekaliśmy długo – wkrótce pojawili się pierwsi zainteresowani otwarciem własnych restauracji Chinkali Pielmieni w ramach udzielonej im przez nas franczyzy.🙍‍♂️🙍‍♀️🙍🙎‍♂️🙎‍♀️Zrobiliśmy film z Dnia Pielmienia i zapytaliśmy klientów o jakość naszego produktu. Możecie zobaczyć, jak barwny i urozmaicony był ten event🥳🍽🥟🫕 (i przeżyć go jeszcze raz, jeśli mieliście okazję w nim uczestniczyć).Dowiedzcie się też, co o naszych produktach powiedzieli Klienci👍👌👏🧚‍♂️🧚‍♀️🧚 – zapytaliśmy ich o wrażenia najbardziej na świeżo, czyli w trakcie posiłku lub tuż po nim.*Specjalne podziękowania🤝 dla Jerzego Sobieniaka za pomoc w organizacji wydarzenia i poprowadzeniu mistrzowskiej klasy robienia pierogów.*😻",
          title: "*Dzień Pielmienia* ",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/132570617_1558004357740662_8300306096339979327_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=730e14&_nc_ohc=aVV4jUM6aK4AX_2IsxA&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT8gzOos9ziO1Ja6fAqqLcQliMZ5he3nvy68z8Kd8zC0mQ&oe=62029AE3",
        },
        {
          text: " Dzień Pielmieni przyniósł wnioski🧐. Wkrótce po nim nastąpiła seria negocjacji (rozmów). Wreszcie jest 🙆‍♂️– pierwszy klient na franczyzę naszej kawiarni `hinkali Pielmieni`!‼️‼️Jest nas dwójka👨‍🍳👩‍🍳. Nasza restauracja jest czynna w piątek, sobotę i niedzielę. Przez resztę czasu pracujemy przy naszej produkcji🫕🍲🥟🥠.Ale lokal weekendowy to nie jest rozwiązanie na dłuższą metę. Podejmujemy odważną decyzję: postanawiamy się rozdzielić!🔀 Pani Ania👩 zostaje w restauracji i przy produkcji, zatrudniając sobie pracownika🧑🏻‍🍳. Ja z kolei zostaję konsultantem 🕵️‍♂️ przy otwarciu restauracji franczyzowej oraz w sprzedaży hurtowej chinkali i pielmieni🥟🥟🥟🥟.Kalkulacja pokazuje, że będzie to bardziej opłacalne dla obu!🙂👍Oglądamy lokal wynajmowany przez klienta. To jest katastrofa🥶😱😨! Dom leży w historycznej części miasta, a miejsce na przyszły lokal to dawny sklep odzieżowy👚👗🧥👔👖🩱👢🩳. W pomieszczeniach – całkowity brak wentylacji grawitacyjnej i mechanicznej. Usunięcie rury wentylacyjnej jest praktycznie niemożliwe😒.Proponujemy klientowi porzucić koncepcję `Chinkali Pielmieni`~~~~~~~~~ i zrobić coś innego. Klient jednak nalega i przekonuje.DOBRZE! Dokonamy niemożliwego😃!🔦🔌🪜🪛🔧🔨🪚🔩⚙️🪓Wentylację nawiewną można rozwiązać wlotem powietrza – wystarczy usunąć szybę nad przednimi drzwiami. Ale co z gorącym powietrzem z garnków w kuchni?...Jest na to rozwiązanie!👉 Stworzyć autorski oczyszczacz powietrza👍.Za podstawę bierzemy system klimatyzacji wewnętrznej. Demontujemy i wyrzucamy obudowę jednostki wewnętrznej. Usuwamy parownik chłodnicy. Przecinamy go na pół, żeby zmniejszyć rozmiar🪚. To, co zostało, składamy na pół i spawamy rurkami łączącymi. Wszystko umieszczamy w specjalnie zrobionej obudowie🎁.Jak działa nasze autorskie ustrojstwo?Ano, tak! Gorące powietrze wraz z parą wodną przechodzi przez okap i wchodzi do parownika, schładza się, skrapla parę wodną, która jest odprowadzana do kanalizacji. Dalej – osuszone już powietrze – za pomocą pary filtrów węglowych usuwane jest przez otwór wentylacyjny w ścianie🌪.Do opracowania i wykonania wentylacji trzeba jeszcze doliczyć czas⏳ i koszty💰 remontu lokalu i uruchomienia restauracji.Po otwarciu – wielka niepewność, czy nakłady się zwrócą🤔🤕.Udało się!😃😀 W krótkim czasie restauracja okazuje się opłacalna.Brawo!🤜🤛 Zwiększyliśmy sprzedaż hurtową chinkali i pierogów...",
          title: "Chmielna 13 - pierwsza pełnoprawna franczyza",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/s600x600/139731796_1572700402937724_282593841125729375_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=tEJBEv4PFgUAX-RkH29&_nc_oc=AQnUqtVpi4bC3UzIzRB9uQFV0zo3aftGarTPxRdBUIXdM8spAhKajQ5GYGSwU3Qut9s&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT8HWxznviHvLWKRzA7FurxK-bH6FzCQYhTsdz9LXBgpHQ&oe=6203478F",
        },
        {
          text: "   Udane otwarcie Chmielnej 13 zwiększyło sprzedaż hurtową naszego produktu👍📈.Poszukujemy kolejnego pomieszczenia, które pojawi się we wrześniu.Ulica Postępu 5. To był ciekawy projekt; koncepcja od razu mi się spodobała – rekonstrukcja byłego warsztatu samochodowego🚇🚘🛻. Dobijamy targu za pokój o powierzchni 45 metrów kwadratowych. To dawne biuro myjni samochodowej.Bierzemy kolejnego franczyzobiorcę. Właśnie przyjechałem do Polski w poszukiwaniu projektu gastronomicznego. Negocjujemy współpracę🤝. Podpisujemy umowę franczyzy i pomagamy w otwarciu kawiarni pod klucz, wraz ze wszystkimi dokumentami. Franczyzobiorca jest zobowiązany do👉 kupowania produktów tylko u nas,👉 przestrzegania naszej koncepcji biznesowej itp.Po rozpoczęciu demontażu przegród zaczynają się pojawiać ukryte niedoskonałości pomieszczenia. Pierwsza to wilgoć 💦💦z myjni samochodowej – część suchej zabudowy jest nasiąknięta. Podejmujemy decyzję o częściowym rozebraniu płyty gipsowo-kartonowej i pozostawieniu w pomieszczeniu części gołych ścian z cegłami. Po wyschnięciu malujemy je. Ponieważ wielkość pomieszczenia pozwala na powiększenie powierzchni kuchennej, dodajemy ekspres do kawy☕. Pora na demontaż 🪚🪛przedniej ściany i zastąpienie jej pełnowymiarową szklaną witryną. Praca przebiega szybko. Mamy trzeci obiekt!👏👏👏 Nie potrzebujemy już szukać od podstaw informacji – wiemy gdzie, co i jak trzeba robić.Mijają dwa miesiące i z marnego biura powstaje restauracja 🍹🍰🥟🥟🥟🥟🫕🥘– z pełną dokumentacją i pozwoleniami!  Niestety, kiedy ja przez kilka miesięcy byłem zaangażowany w ten projekt, zaczęły się problemy z pierwszym franczyzobiorcą😟. Nie ustalając tego z nami, zaczął zmieniać menu – odszedł od koncepcji.🥶😱👽 Negocjacje nie przyniosły efektu. Podjęliśmy decyzję o wycofaniu franczyzy⛔. Nie wzywaliśmy do sankcji traktatowych, bo to długi i żmudny proces.Drugi franczyzobiorca przetrwał kilka tygodni po otwarciu. Tu był ten sam problem!😔Szczerze pisząc, nawet nie zawracałem sobie głowy rozmową, po prostu – zablokowałem telefon, sieci społecznościowe, zadzwoniłem i powiedziałem👿 „Wycofać franczyzę!”.I tak upłynęło pół roku! Zostawiłem sprzedaż detaliczną i zająłem się tylko działalnością hurtową. Wiedziałem jedno: to jest katastrofa! 😱 Poduszka finansowa wprawdzie była, ale mała – na długo mi to nie wystarczy. Powrót do Hali Gwardii oznaczał przyznanie się do porażki! 😫Przed nami była zima...❄☃️❄",
          title: " Bunt franczyzobiorcy",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/s600x600/140024983_1573962196144878_7473964079537836245_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=JfaQpQSfmx0AX-907Xn&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT-62rZOsAAKVDnKl82Y-i-nEMRrY6UAuL7ZXwotcB4J5g&oe=62053B9A",
        },
        {
          text: "Pod koniec października 2018 wpadłem w jakiś wir złych zdarzeń🌪️. Wszystkie trzy moje próby sprzedaży franczyz zakończyły się błędem ludzkim😐🤔.Nie boję się swoich błędów. Mam ich na swoim koncie nadzwyczaj dużo. Cale góry błędów.🌋🌋🌋 Obawiam się jednak popełniania błędów przez innych – szczególnie, jeśli ludzie ci są w jakiś sposób ze mną związani. Na cudze błędy nie mam wpływu. Ale mogą mnie dotknąć konsekwencje tych właśnie cudzych błędów⛔. Dla lubiącego ryzyko myśliwego zły strzał to po prostu strzał chybiony. Każdy jednak strzał dodaje emocji i wzmaga chęć trafienia w cel🏵️. Co robić dalej?... ⁉️⁉️Brak pomysłu i energii.Dopada mnie kilka miesięcy bezczynności i depresji😒☹️😣. Wreszcie przychodzi olśnienie, gdzie leży problem – wszystkie trzy nieudane próby, trzy różne możliwości rozszerzenia biznesu łączy jedno: gastronomia!🫕🥗🥘🥟🥟🥟Dosyć! Gastronomii – mówię stanowczo NIE!❌🛑Nie ma dobrych ani złych decyzji – są tylko decyzje zaakceptowane. Tylko podjęte decyzje otwierają okno możliwości i zmieniają los!Odchodzę z biznesu🙋‍♂️. Czas się odsunąć i rozejrzeć. Zacząć w innej branży. Przerwać pasmo niepowodzeń!Zarobić na kawałek chleba z masłem (a czasem z kiełbasą na wierzchu) w Warszawie to nie problem☝️!W moim przypadku pojawiła się opcja obsługi taksówki.Tak, zostałem taksówkarzem😎🚕. Ogarnął mnie ten nowy pomysł, pojawiły się nowe znajomości i nowe wrażenia🤠🙉. W chwilach znudzenia, czekając jako taksówkarz na zamówienie, zacząłem pisać notatki o sytuacjach, w których się znalazłem. Krótkie historie w stylu repa. Może kiedyś opublikuję🙊.Jak długo byłbym taksówkarzem, nie wiem. Ale niebo zdecydowało inaczej. Przeżyłem atak szalonego nałogowca👽👿🤡👹👺 i jeszcze kilka nieprzyjemnych w sytuacji. Powiedziałem sobie po raz kolejny: Dosyć!❗❗❗Nadszedł czas oczekiwania na kolejny pomysł, kolejną przygodę🪂. Długo nie musiałem czekać. Idea przyszła do mnie prędzej, niż sądziłem. Ale o tym w następnym odcinku ...🤠👋",
          title: "Taksówkarz",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t1.6435-9/p180x540/140518489_1574750516066046_6709184072014463700_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=730e14&_nc_ohc=VDfAcukRoowAX-5Vjld&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT_v00_DSNIyfXJ8_c3Hnr1qGEFF-DK4jsw1pWBYi_WgRA&oe=62025405",
        },
        {
          text: " Postawiłem na krótkie wakacje po pracy w zawodzie taksówkarza🚕🏖. Czas wolny umiliły spacery na świeżym powietrzu.🚶🏻‍♂️ To była dobra decyzja, bo w pewnym momencie wewnętrzny głos wyszeptał🗣️: `Sieć handlowa!`.🤔🤩🙉Stworzyliśmy przecież linię wysokiej jakości produktów dla gastronomii. Wszystko bezpieczne, bez konserwantów, długi termin przydatności do spożycia, wysoka jakość.TAK! ❗Czas iść do sieci handlowych!❗Doskonale znam model zachowań klientów w gastronomii publicznej. Wiem, jak i co im sprzedać.🧐Muszę teraz tylko zrozumieć, jak działa sklep spożywczy i popracować👀 nad klientem takiej placówki handlowej.Mi jest potrzebny sklep!❗No tak, ale fundusze – skąd je wziąć?...💥Olśniło mnie: aby spróbować, jak działa sklep, nie trzeba go otwierać!Poszukiwanie sklepu z jednym sprzedawcą nie trwało długo. Niezbędny przedmiot znalazłem sto💯 metrów od domu.Rozpoczęło się nowe ciekawe życie.😀🙃😀🙃 Wszystko, co działo się wokół, było dla mnie nowe. Równolegle zacząłem przygotowywać model biznesowy – całkowicie nowego biznesu. Zacząłem pukać do wszystkich inwestorów i do funduszy inwestycyjnych. Każda komunikacja przyniosła nowe wyzwania. Analiza rynku, analiza konkurencji, finalnie modele, biznes plany, ekonomika jednostki itp.📈📊📆🗓👑Korona przybyła w marcu 2020 roku.      Podziękowałem niebiosom za to, że znalazłem się we właściwym miejscu we właściwym czasie🙏. Mam wszystko, czego potrzebuję, bez zobowiązań.Pod koniec maja zostałem finalistą internetowej bitwy startupów w Kijowie.✌No, teraz można dzwonić do inwestora – wszystko gotowe.Moja wielka inwestycyjna rozmowa wyglądała tak:Ja: _Cześć!_ Inwestor: _Cześć!_ Ja: _Potrzebuję pieniędzy._ I: _Ilość?_ Ja: _Więcej niż sześć zer._ I: _Dziś trudno uzbierać taką kwotę na Ukrainie!_Ja: _Dasz radę! Ja tego potrzebuję. Prezentacje, wszystkie obliczenia i model biznesowy zostaną wysłane do Ciebie pocztą.I: _Ok._Ja: _Na razie._I: - _Na razie._Podczas gdy inwestor gromadził wymaganą kwotę💰💰💰, ja miałem wystarczająco dużo czasu, aby przygotować `mapę drogową` do rozpoczęcia mojego nowego biznesu. Po pierwsze: trzeba zebrać zespół👬🏻👭👫🏽.Pod koniec września zadzwonił telefon. Inwestor zakomunikował:_– Potrzebna kwota jest na europejskim rachunku!_Czas pożegnać się ze sklepem z jednym sprzedawcą👋🧍‍♂️. Przed nami dużo pracy ...",
          title: "Sprzedawca",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t45.1600-4/cp0/q75/spS444/p526x296/143932146_23847186707870436_956625633744321730_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=67cdda&_nc_ohc=3yF9MKtVFNwAX_7JTqR&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT_XWPxHhIUmV6XT9881HAWe7WpgNMDa4dC5bY2v4fj2HQ&oe=61E27BE2",
        },
        {
          text: " Cóż, Przyjaciele, pierwsza partia pielmieni gotowa!😃😀😃TAK! 🤩 Nasze pielmieni są już w opakowaniu! Zespół zadziałał👱‍♀️🧑‍🦰👨🏻‍🦰👨🏻‍🦱; wszystko w porządku.Tym razem wszystkie puzzle🧩🧩🧩🧩🧩 zostały dopasowane i utworzyły piękną układankę🥘🍲🫕🥟. Jesteśmy w trakcie negocjacji i podpisywania✍ umowy z siecią handlową.Czekam teraz na wyniki👉📈📊. Kolejne cele zostały już wyznaczone, a ścieżka jest wyraźnie widoczna!🛣Do roboty!",
          title: "Zespół zadziałał ",
          image_url:
            "https://scontent.fpoz4-1.fna.fbcdn.net/v/t45.1600-4/cp0/q75/spS444/p526x296/141155962_23847186746090436_6459335756627718441_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=67cdda&_nc_ohc=iJDCGjqWAvcAX-Dza2O&_nc_ht=scontent.fpoz4-1.fna&oh=00_AT_clFRGcNH0GlxSEnBNORPcC5qD9T2Aigttwe4rS3Pf_w&oe=61E25366",
        },
      ],
    };
  },
};
</script>

<style>
.timeline {
  z-index: 1 !important;
  max-width: 80%;
  margin: 0 auto;
}
</style>
