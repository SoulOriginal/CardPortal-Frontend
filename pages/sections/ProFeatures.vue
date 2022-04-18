<template>
  <base-section id="pro-features" :space="32">
    <v-img :src="'/logo-free.png'" class="mx-auto mb-8" max-width="128" />

    <base-section-heading :title="$t('home_page.feature_comparison.title')">
      {{ $t('home_page.feature_comparison.description') }}
    </base-section-heading>

    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" md="7">
          <v-simple-table>
            <thead>
              <tr>
                <th />
                <th class="body-1 font-weight-bold text-center">
                  {{ $t('home_page.feature_comparison.demo') }}
                </th>
                <th class="body-1 font-weight-bold text-center">
                  {{ $t('home_page.feature_comparison.pro') }}
                </th>
              </tr>
            </thead>

            <tbody class="body-1">
              <tr v-for="([name, one, two], i) in features" :key="i">
                <td v-text="name" />

                <td class="text-center font-weight-bold">
                  <template v-if="typeof one === 'boolean'">
                    <v-icon :color="one ? 'success' : 'error'">
                      mdi-{{ one ? 'check' : 'close' }}
                    </v-icon>
                  </template>

                  <template v-else>
                    {{ one }}
                  </template>
                </td>

                <td class="text-center font-weight-bold">
                  <template v-if="typeof two === 'boolean'">
                    <v-icon :color="two ? 'success' : 'error'">
                      mdi-{{ two ? 'check' : 'close' }}
                    </v-icon>
                  </template>

                  <template v-else>
                    {{ two }}
                  </template>
                </td>
              </tr>
            </tbody>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
export default {
  name: 'SectionProChart',
  computed: {
    features () {
      return [
        [this.$t('home_page.feature_comparison.personal_assistant'), false, true],
        [this.$t('home_page.feature_comparison.access'), false, true],
        [this.$t('home_page.feature_comparison.purpose'), true, true],
        [this.$t('home_page.feature_comparison.candidate'), false, true],
        [this.$t('home_page.feature_comparison.online_directory'), false, true]
      ]
    }
  }
}
</script>
<style scoped>
.ponter {
  cursor: pointer;
}
</style>
