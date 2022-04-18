<template>
  <base-section
    class="secondary"
    :space="32"
  >
    <base-info-card

      :title="$t('home_page.why_choose_us.title')"
      align="center"
      dark
    >
      <span class="text-white">{{ $t('home_page.why_choose_us.description') }}</span>
    </base-info-card>

    <v-responsive
      class="mx-auto"
      max-width="1350"
    >
      <v-container fluid>
        <v-row>
          <v-col

            cols="12"
            md="3"
            sm="6"
          >
            <base-info-card
              icon="mdi-security"
              :title="$t('home_page.why_choose_us.secure_platform')"
              align="center"
              dark
            >
              {{ $t('home_page.why_choose_us.secure_platform_description') }}
            </base-info-card>
          </v-col>
          <v-col

            cols="12"
            md="3"
            sm="6"
          >
            <base-info-card
              icon="mdi-rocket"
              :title="$t('home_page.why_choose_us.easy_to_use')"
              align="center"
              dark
            >
              {{ $t('home_page.why_choose_us.easy_to_use_description') }}
            </base-info-card>
          </v-col>
          <v-col

            cols="12"
            md="3"
            sm="6"
          >
            <base-info-card
              icon="mdi-feather"
              :title="$t('home_page.why_choose_us.creative_solutions')"
              align="center"
              dark
            >
              {{ $t('home_page.why_choose_us.creative_solutions_description') }}
            </base-info-card>
          </v-col>
          <v-col

            cols="12"
            md="3"
            sm="6"
          >
            <base-info-card
              icon="mdi-waves"
              :title="$t('home_page.why_choose_us.work_at_sea')"
              align="center"
              dark
            >
              {{ $t('home_page.why_choose_us.work_at_sea_description') }}
            </base-info-card>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
    </base-info-card>
  </base-section>
</template>

<script>
export default {
  name: 'SectionFeatures',

  data: () => ({
    cards: [
      {
        icon: 'mdi-keyboard-outline',
        title: 'Trendy Design',
        text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.'
      },
      {
        icon: 'mdi-camera-outline',
        title: 'Photography',
        text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.'
      },
      {
        icon: 'mdi-pencil-outline',
        title: 'Brand Making',
        text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.'
      },
      {
        icon: 'mdi-puzzle-outline',
        title: '24/7 Support',
        text: 'Efficiently unleash media information without cross-media value. Quickly maximize value timely deliverables schemas.'
      }
    ]
  })
}
</script>
