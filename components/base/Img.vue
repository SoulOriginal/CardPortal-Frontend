<template>
  <v-img v-bind="$attrs" v-on="$listeners" align="center" justify="center">
    <slot />
  </v-img>
</template>

<script>
export default {
  name: "BaseImage",
};
</script>
