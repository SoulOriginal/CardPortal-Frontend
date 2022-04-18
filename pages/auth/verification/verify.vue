<template>
  <no-ssr>
    <div class="container content restore">
      <!-- <h2>{{ $t("verify_email") }}</h2> -->
      <div class="card" id="home-app-bar">
        <div class="mb-40 center" style="color: white" v-if="verified">
          {{ $t("verify_email_done") }}
        </div>
        <div
          class="mb-40 center"
          style="color: white"
          v-else-if="verified_error"
        >
          {{ $t("failed_to_verify_email") }}
        </div>
        <p v-else class="mb-40" style="color: white">
          {{ $t("verify_email_address") }}
        </p>
      </div>
    </div>
  </no-ssr>
</template>

<script>
export default {
  name: "verifiedPage",
  layout: "home",
  async mounted() {
    setTimeout(() => {
      this.$router.push({ path: "/" });
    }, 5000);
    console.log(this.$route.query);
    if (
      this.$route.query.token == undefined &&
      this.$route.query.email == undefined
    )
      return;
    var DataChek = await this.$axios.post(`/user/chek/email`, {
      email: this.$route.query.email,
      remember_token: this.$route.query.token,
      type: "verified",
    });
    if (DataChek.data.payload == "ok") {
      this.verified = true;
      console.log("okey");
      // setInterval(this.$router.push({ path: this.localePath("/auth/login") }), 10000)
    } else {
      if (Object.keys(this.$route.query).length !== 0) {
        if (
          this.$route.query.token == undefined &&
          this.$route.query.email == undefined
        ) {
          this.verified_error = true;
        }
      }
    }
  },
  data() {
    return {
      verified: false,
      verified_error: false,
    };
  },
};
</script>

<style lang="scss" scoped>
$maxWidth: 1300;
@mixin adaptiv-font($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  font-size: calc(
    #{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth})
  );
}
.center {
  display: flex;
  justify-content: center;
}
.restore {
  min-height: calc(100vh - 147px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 40px;

  p {
    line-height: 1.3;
    color: #212121;
    @include adaptiv-font(18, 16);
    @media (min-width: $maxWidth + px) {
      font-size: 16px;
    }
  }

  h2 {
    margin-bottom: 40px;
    font-weight: 600;
    @include adaptiv-font(36, 18);
    @media (min-width: $maxWidth + px) {
      font-size: 36px;
    }
  }
}
.card {
  width: 100%;
  max-width: 665px;
  border-radius: 20px;
  padding: 40px;
  background-color: #9e24e4;
  text-align: center;
  @media (max-width: 576px) {
    padding: 30px;
  }

  .link {
    font-size: 18px;
    color: #4378ff;
    text-decoration: none;
    font-weight: 500;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;

    &:active {
      outline: none;
    }

    @media (max-width: 576px) {
      display: inline-block;
      width: 100%;
      text-align: center;
    }
  }
}

.primary {
  font-size: 21px;
  cursor: pointer;
  padding: 14px 20px;
}
</style>
