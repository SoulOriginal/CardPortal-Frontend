<template>
  <v-container fluid ma-0 fill-height>
    <v-layout row justify-center v-if="locale == 'ru'">
      <v-flex>
        <v-card
          ripple
          rounded
          max-width="1440px"
          elevation="11"
          background-color="#333"
          style="z-index: 0"
          class="mx-auto pa-4 grey darken-3 white--text"
        >
          <h2>Политика конфиденциальности</h2>
          <ol>
            <li>какие данные мы собираем и зачем</li>
            <li>как мы используем собранные данные</li>
          </ol>
          <h2 class="title-red">Какую информацию мы собираем</h2>
          <p>
            Getman собирает информацию, которая помогает улучшать наши сервисы,
            начиная с настроек уведомлений и заканчивая более сложными
            функциями. Например, мы можем находить для вас полезные объявления,
            новости.
          </p>
          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header>Пароль</v-expansion-panel-header>
              <v-expansion-panel-content>
                Пароль сохраняется в системе в зашифрованном виде без
                возможности его расшифровки. Если Вы забыли свой пароль - его
                возможно восстановить используя функцию восстановления пароля
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Почта</v-expansion-panel-header>
              <v-expansion-panel-content>
                Храниться в системе, другие пользователи не могут выидеть ваш
                Email
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Вводимые данные</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                Данные которые вы лично предоставляете Getman например при
                регистрации или при создании точки.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <h2 class="title-red">Локальное хранилище</h2>
          <p>
            Мы собираем и храним данные (в том числе и персональные) на ваших
            пользовательских устройствах с помощью таких средств, как
            веб-хранилище браузера (включая HTML5) и кеш данных, используемых
            приложениями.
          </p>
          <h2 class="title-red">Файлы cookie и аналогичные технологии</h2>
          <p>
            Чтобы получать и записывать данные о том, как используются сервисы
            Getman, мы применяем самые разные технологии, например можем
            добавлять на ваше устройство файлы cookie или аналогичные
            технологии. Таким же способом мы получаем статистику по сервисам,
            предназначенным для наших партнеров: обычно это решения для работы с
            рекламой.
          </p>
          <h2 class="title-red">Как мы используем собранные данные</h2>
          <p>
            Благодаря полученным данным мы можем предоставлять, поддерживать,
            защищать, развивать существующие сервисы и создавать новые, а также
            обеспечивать безопасность Getman и наших пользователей. Помимо
            прочего, эти данные нужны для того, чтобы более точно
            персонализировать контент, в том числе повышать релевантность
            результатов поиска.
          </p>
          <p>
            При необходимости использовать ваши данные для целей, не упомянутых
            в настоящей политике конфиденциальности, мы всегда запрашиваем
            предварительное согласие на это.
          </p>
          <h2 class="title-red">
            Как найти и изменить свои персональные данные
          </h2>
          <p>
            У Вас всегда есть доступ к своим персональным данным в Google. Если
            они указаны неверно, мы предоставим способ быстро изменить или
            удалить их. Это не касается случаев, когда сохранение сведений
            необходимо для оправданных коммерческих или юридических целей.
            Иногда, получив просьбу изменить персональные данные, мы можем
            попросить пользователя подтвердить свою личность.
          </p>
          <p>
            Мы можем отклонять многократно повторяющиеся заявки, а также
            запросы, требующие обширных технических работ (например, создать
            новую систему или значительно изменить существующую), подвергающие
            риску конфиденциальность других пользователей, а также содержащие
            бесполезные предложения (например, обработать информацию на
            резервных копиях).
          </p>
          <p>
            Все просьбы получить и исправить информацию мы выполняем бесплатно
            при условии, что они не сопряжены с чрезмерными техническими
            сложностями. Наши службы функционируют таким образом, чтобы
            минимизировать риск случайного или преднамеренного повреждения
            данных. Поэтому после того как пользователь удалит свою информацию
            из служб Getman, она некоторое время будет храниться на наших
            активных серверах. При этом могут существовать и ее резервные копии.
          </p>
          <h2 class="title-red">
            Информация, которую Getman предоставляет третьим лицам
          </h2>
          <p>
            Мы не раскрываем личную информацию пользователей компаниям,
            организациям и частным лицам, не связанным с Getman.
          </p>
          <h2 class="title-red">Защита информации</h2>
          <p>
            Мы делаем все возможное для того, чтобы обезопасить Getman и наших
            пользователей от несанкционированных попыток доступа, изменения,
            раскрытия или уничтожения хранящихся у нас данных. В частности, мы
            делаем следующее:
          </p>
          <ol>
            <li>Активно используем SSL-шифрование в наших службах.</li>
            <li>
              Постоянно совершенствуем способы сбора, хранения и обработки
              данных, включая физические меры безопасности, для противодействия
              несанкционированному доступу к нашим системам.
            </li>
            <li>
              Ограничиваем нашим сотрудникам, подрядчикам и агентам доступ к
              персональным данным, а также накладываем на них строгие договорные
              обязательства, за нарушение которых предусмотрены серьезная
              ответственность и штрафные санкции.
            </li>
          </ol>
        </v-card></v-flex
      >
    </v-layout>
    <v-layout row justify-center v-else>
      <v-flex>
        <v-card
          ripple
          rounded
          max-width="1440px"
          elevation="11"
          background-color="#333"
          style="z-index: 0"
          class="mx-auto pa-4 grey darken-3 white--text"
        >
          <h2>Polityka prywatności</h2>
          <ol>
            <li>jakie dane zbieramy i dlaczego</li>
            <li>jak wykorzystujemy zebrane dane</li>
          </ol>
          <h2 class="title-red">Jakie informacje zbieramy</h2>
          <p>
            Serwis Getman zbiera informacje, które pomagają ulepszać nasze
            usługi, od ustawień powiadomień do bardziej zaawansowanych funkcji.
            Na przykład możemy znaleźć dla Ciebie przydatne ogłoszenia,
            wiadomości.
          </p>
          <v-expansion-panels focusable>
            <v-expansion-panel>
              <v-expansion-panel-header>Hasło</v-expansion-panel-header>
              <v-expansion-panel-content>
                Przechowywane w systemie w postaci zaszyfrowanej bez możliwości
                jego odszyfrowania. Jeśli zapomniałeś hasła - możesz je odzyskać
                za pomocą funkcji odzyskiwania hasła
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>E-mail</v-expansion-panel-header>
              <v-expansion-panel-content>
                Przechowywane w systemie, inni użytkownicy nie mogą zobaczyć
                twojego adresu e-mail
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header
                >Dane wprowadzane</v-expansion-panel-header
              >
              <v-expansion-panel-content>
                Dane, które osobiście podajesz do serwisu Getman, na przykład
                podczas rejestracji lub podczas tworzenia punktu.
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <h2 class="title-red">Pamięć lokalna</h2>
          <p>
            Dane (w tym dane osobowe) są zbierane ta przechowywane na
            urządzeniach użytkowników za pomocą takich narzędzi, jak pamięć
            internetowa przeglądarki (w tym HTML5) i pamięć podręczna danych
            używanych przez aplikacje.
          </p>
          <h2 class="title-red">Pliki cookie i podobne technologie</h2>
          <p>
            Aby otrzymywać i rejestrować informacje o sposobie korzystania z
            usług serwisu Getman, stosujemy wiele różnych technologii, na
            przykład możemy dodawać pliki cookie lub podobne technologie do
            Twojego urządzenia. W ten sam sposób uzyskujemy statystyki dotyczące
            usług przeznaczonych dla naszych partnerów: zazwyczaj są to
            rozwiązania reklamowe.
          </p>
          <h2 class="title-red">Jak wykorzystujemy zebrane dane</h2>
          <p>
            Dzięki uzyskanym danym jesteśmy w stanie dostarczać, utrzymywać,
            chronić, rozwijać istniejące usługi i tworzyć nowe, a także
            zapewniać bezpieczeństwo Getman i naszym użytkownikom. Dane te są
            między innymi potrzebne do dokładniejszej personalizacji treści, w
            tym do zwiększenia trafności wyników wyszukiwania.
          </p>
          <p>
            Jeśli konieczne jest wykorzystanie danych użytkownika do celów
            niewymienionych w niniejszej polityce prywatności, zawsze prosimy o
            wcześniejszą zgodę na to.
          </p>
          <h2 class="title-red">Jak znaleźć i zmienić swoje dane osobowe</h2>
          <p>
            Zawsze masz dostęp do swoich danych osobowych w Google. Jeśli
            zostaną podane niepoprawnie, zapewnimy sposób ich szybkiej zmiany
            lub usunięcia. Nie dotyczy to sytuacji, w których przechowywanie
            informacji jest niezbędne do uzasadnionych celów handlowych lub
            prawnych. Czasami po otrzymaniu prośby o zmianę danych osobowych
            możemy poprosić Użytkownika o potwierdzenie jego tożsamości.
          </p>
          <p>
            Możemy odrzucać wielokrotnie powtarzane zgłoszenia, a także żądania
            wymagające obszernych prac technicznych (takich jak utworzenie
            nowego systemu lub znacząca zmiana istniejącego), które zagrażają
            prywatności innych użytkowników, a także zawierają bezużyteczne
            sugestie (takie jak przetwarzanie informacji w kopiach zapasowych).
          </p>
          <p>
            Wszystkie prośby o uzyskanie i poprawienie informacji realizujemy
            bezpłatnie pod warunkiem, że nie wiążą się one z nadmiernymi
            trudnościami technicznymi. Nasze usługi działają w taki sposób, aby
            zminimalizować ryzyko przypadkowego lub celowego uszkodzenia danych.
            Dlatego po usunięciu przez Użytkownika swoich informacji z serwisu
            Getman będą one przez pewien czas przechowywane na naszych aktywnych
            serwerach. W takim przypadku mogą istnieć jego kopie zapasowe.
          </p>
          <h2 class="title-red">
            Informacje, które Getman udostępnia osobom trzecim
          </h2>
          <p>
            Nie ujawniamy danych osobowych użytkowników firmom, organizacjom i
            osobom niepowiązanym z Getman.
          </p>
          <h2 class="title-red">Ochrona Informacji</h2>
          <p>
            Dokładamy wszelkich starań, aby chronić serwis Getman i naszych
            użytkowników przed nieautoryzowanymi próbami dostępu, zmiany,
            ujawnienia lub zniszczenia przechowywanych przez nas danych. W
            szczególności wykonujemy następujące czynności:
          </p>
          <ol>
            <li>Aktywnie korzystamy z szyfrowania SSL w naszych usługach.</li>
            <li>
              Stale ulepszamy sposób gromadzenia, przechowywania i przetwarzania
              danych, w tym fizyczne środki bezpieczeństwa, aby przeciwdziałać
              nieautoryzowanemu dostępowi do naszych systemów.
            </li>
            <li>
              Ograniczamy naszym pracownikom, kontrahentom i agentom dostęp do
              danych osobowych, a także nakładamy na nich surowe zobowiązania
              umowne, za naruszenie których wiąże się poważna odpowiedzialność i
              kary.
            </li>
          </ol>
        </v-card></v-flex
      >
    </v-layout>
  </v-container>
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

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 400;
}
p,
ol {
  margin: 0 0 10px;
}
.title-red {
  color: #ff6666;
}
</style>
