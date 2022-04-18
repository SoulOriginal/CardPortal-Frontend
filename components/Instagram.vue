<template>
  <base-info-card :title="$t('instagram')">
    <v-row dense>
      <v-col v-for="image in images" :key="image" cols="auto">
        <a href="https://www.instagram.com/oneclick_marine/" target="_blank">
          <base-img :src="`/images/instagram/${image}`" color="grey lighten-1" width="96" tile />
        </a>
      </v-col>
    </v-row>
  </base-info-card>
</template>

<script>
export default {
  name: 'Instagram',
  data: () => ({
      images: [
          '130501151_403268077588451_1214675603652072132_n.jpg',
          '129311314_857366995115186_2198887334338463513_n.jpg',
          '129248814_1008839342930981_6406918903147544067_n.jpg',
          '128469943_814795889380172_2866555193114322448_n.jpg',
          '130715892_144600940776217_2917758333732069976_n.jpg',
          '131005843_132136568706168_2941937975389278745_n.jpg'
      ]
})
}
</script>
