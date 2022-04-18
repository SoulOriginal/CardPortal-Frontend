<template>
  <base-section id="theme-features" :space="32">
    <base-section-heading
      :title="$t('home_page.features.our_services')"
    >
      {{ $t('home_page.features.description') }}
    </base-section-heading>

    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <base-avatar-card
            icon="mdi-web"
            :title="$t('home_page.features.online_employment')"
            align="left"
            horizontal
          >
            {{ $t('home_page.features.online_employment_description') }}
          </base-avatar-card>
        </v-col>
        <v-col cols="12" md="6">
          <base-avatar-card
            icon="mdi-quality-high"
            :title="$t('home_page.features.quality_management')"
            align="left"
            horizontal
          >
            {{ $t('home_page.features.quality_management_description') }}
          </base-avatar-card>
        </v-col>
        <v-col cols="12" md="6">
          <base-avatar-card
            icon="mdi-video"
            :title="$t('home_page.features.video_cv_resume')"
            align="left"
            horizontal
          >
            {{ $t('home_page.features.video_cv_resume_description') }}
          </base-avatar-card>
        </v-col>
        <v-col cols="12" md="6">
          <base-avatar-card
            icon="mdi-history"
            :title="$t('home_page.features.support')"
            align="left"
            horizontal
          >
            {{ $t('home_page.features.support_description') }}
          </base-avatar-card>
        </v-col>
        <v-col cols="12" md="6">
          <base-avatar-card
            icon="mdi-certificate"
            :title="$t('home_page.features.most_demand')"
            align="left"
            horizontal
          >
            {{ $t('home_page.features.most_demand_description') }}
          </base-avatar-card>
        </v-col>
        <v-col cols="12" md="6">
          <base-avatar-card
            icon="mdi-lightbulb-on-outline"
            :title="$t('home_page.features.light_services')"
            align="left"
            horizontal
          >
            {{ $t('home_page.features.light_services_description') }}
          </base-avatar-card>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
export default {
  name: 'SectionOurServices',

  data: () => ({
    features: [
      {
        title: 'Pixel Perfect Design',
        icon: 'mdi-fountain-pen-tip'
      },
      {
        title: 'Retina Ready',
        icon: 'mdi-cellphone'
      },
      {
        color: 'primary',
        dark: true,
        title: 'Easily Customizable',
        icon: 'mdi-pencil-box-outline'
      },
      {
        title: 'Image Parallax',
        icon: 'mdi-image-size-select-actual'
      },
      {
        title: 'Seo Optimized',
        icon: 'mdi-ice-pop'
      },
      {
        title: '24/7 Support',
        icon: 'mdi-help-circle-outline'
      }
    ]
  })
}
</script>
