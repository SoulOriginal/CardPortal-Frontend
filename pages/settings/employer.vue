<template>
  <card :title="$t('your_info')">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(update)">
        <!-- Name --> 
        <ValidationProvider v-slot="{ errors }" rules="required">
          <v-text-field 
            v-model="form.company_name"
            :label="$t('company')"
            name="company"
            prepend-icon="mdi-home-city-outline"
            type="text"
            dark
            required
          />
          <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required">
        <v-autocomplete
            auto-select-first
            clearable
            :label="$t('country')" 
            :items="flags"
            dark
            name="country"
            prepend-icon="mdi-earth" 
            v-model="form.country"
            item-text="сountry"
            item-value="сountry"
        > 
            <template v-slot:item="data">
                <v-list-item-avatar><img :src="data.item.image"></v-list-item-avatar>
                <v-list-item-content>
                <v-list-item-title v-html="data.item.сountry"></v-list-item-title>
                </v-list-item-content>
            </template>
        </v-autocomplete>
          <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
        </ValidationProvider>
        <!-- Email -->
        <ValidationProvider v-slot="{ errors }" rules="required">
          <!-- <v-text-field 
            v-model="form.email"
            :label="$t('city')"
            name="email"
            prepend-icon="mdi-city"
            type="email"
            dark
            required
          /> -->
            <div class="d-flex ">
                <v-icon style="margin-right: 9px;" medium color="white">mdi-city</v-icon>
                <places
                    v-model="form.city"
                    :placeholder="$t('city')"
                    @change="val => {city_data = val }"
                    :options="{type:'city',language: 'en',getRankingInfo:true}"
                >
                </places>
            </div>
          <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required">
          <!-- <v-text-field 
            v-model="form.email"
            :label="$t('address')"
            name="email"
            prepend-icon="mdi-google-maps"
            type="email"
            dark
            required
          /> -->
          <div class="d-flex" style="padding-top: 12px; margin-top: 4px;">
            <v-icon style="margin-right: 9px;" medium color="white">mdi-google-maps</v-icon>
            <places
                name="address"
                v-model="form.address"
                @change="val => {address_data = val }"
                :placeholder="$t('address')"
                :options="options"
            >
               </places>
          </div>
          <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required|email" name="form.email">
          <v-text-field 
            v-model="form.contact_email"
            :label="$t('email')"
            name="email"
            prepend-icon="mdi-email"
            dark
            required
          />
          <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
        </ValidationProvider>
        <ValidationProvider v-slot="{ errors }" rules="required" name="form.email">
          <v-text-field 
            v-model="form.phone"
            :label="$t('phone')"
            name="phone"
            prepend-icon="mdi-phone-in-talk"
            dark
            required
          />
          <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
        </ValidationProvider>
        <!-- <ValidationProvider v-slot="{ errors }" rules="required" name="form.email"> -->
          <v-text-field 
            v-model="form.site"
            :label="$t('site')"
            name="site"
            prepend-icon="mdi-search-web"
            dark
            required
          />
          <!-- <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
        </ValidationProvider> -->
        <ValidationProvider v-slot="{ errors }" rules="required" name="form.email">
          <v-text-field 
            v-model="form.contact_person"
            :label="$t('contact_person')"
            name="contact_person"
            prepend-icon="mdi-contacts"
            dark 
            required
          />
          <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
        </ValidationProvider>
        <!-- <ValidationProvider v-slot="{ errors }" rules="required" name="form.email"> -->
          <v-text-field 
            v-model="form.license"
            :label="$t('license')"
            name="license"
            prepend-icon="mdi-license"
            dark
            required 
          />
            <v-textarea
            filled
            clearable
            counter="500"
            auto-grow
            name="description"
            :label="$t('description')"
            dark
            v-model="form.description"
        ></v-textarea>
        <div>
          <button type="submit" color="primary" class="mr-2 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary">
            {{ $t('update') }}
          </button>
        </div>
      </form>
    </ValidationObserver> 
  </card> 
</template>

<script>
import { mapGetters } from "vuex";
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Places from 'vue-places'

export default { 
  layout: "employer",
  scrollToTop: false,
  components: {
    ValidationObserver,
    ValidationProvider,
    Places
  },
  head() {
    return { title: this.$t("settings") };
  },
 
  data: () => ({
    city_data:null,
    address_data:null,
    form:{
        company_name: null,
        country: null,
        city: null,
        address: null,
        contact_email: null,
        phone: null,
        site:null,
        license: null,
        contact_person: null,
        description: null,
    },
    options:{
         language: 'en',
        //  postcodeSearch:true,
         useDeviceLocation:true
       },
   flags:  [
      { сountry: 'Afghanistan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/af.svg' },
      { сountry: 'Aland Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ax.svg'  },
      { сountry: 'Albania', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/al.svg'},
      { сountry: 'Algeria', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/dz.svg'},
      { сountry: 'American Samoa', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/as.svg'},
      { сountry: 'Andorra', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ad.svg'},
      { сountry: 'Angola', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ao.svg'},
      { сountry: 'Anguilla', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ai.svg'},
      { сountry: 'Antigua and Barbuda', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ag.svg'},
      { сountry: 'Argentina', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ar.svg'},
      { сountry: 'Armenia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/am.svg'},
      { сountry: 'Aruba', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/aw.svg'},
      { сountry: 'Australia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/au.svg'},
      { сountry: 'Austria', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/at.svg'},
      { сountry: 'Azerbaijan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/az.svg'},
      { сountry: 'Bahamas', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bs.svg'},
      { сountry: 'Bahrain', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bh.svg'},
      { сountry: 'Bangladesh', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bd.svg'},
      { сountry: 'Barbados', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bb.svg'},
      { сountry: 'Belarus', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/by.svg'},
      { сountry: 'Belgium', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/be.svg'},
      { сountry: 'Belize', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bz.svg'},
      { сountry: 'Benin', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bj.svg'},
      { сountry: 'Bermuda', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bm.svg'},
      { сountry: 'Bhutan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bt.svg'},
      { сountry: 'Bolivia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bo.svg'},
      { сountry: 'Bonaire, Sint Eustatius and Saba', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bq.svg'},
      { сountry: 'Bosnia and Herzegovina', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ba.svg'},
      { сountry: 'Botswana', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bw.svg'},
      { сountry: 'Brazil', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/br.svg'},
      { сountry: 'British Indian Ocean Territory', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/io.svg'},
      { сountry: 'Brunei Darussalam', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bn.svg'},
      { сountry: 'Bulgaria', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bg.svg'},
      { сountry: 'Burkina Faso', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bf.svg'},
      { сountry: 'Burundi', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bi.svg'},
      { сountry: 'Cabo Verde', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cv.svg'},
      { сountry: 'Cambodia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/kh.svg'},
      { сountry: 'Cameroon', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cm.svg'},
      { сountry: 'Canada', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ca.svg'},
      { сountry: 'Cayman Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ky.svg'},
      { сountry: 'Central African Republic', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cf.svg'},
      { сountry: 'Chad', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/td.svg'},
      { сountry: 'Chile', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cl.svg'},
      { сountry: 'China', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cn.svg'},
      { сountry: 'Christmas Island', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cx.svg'},
      { сountry: 'Cocos (Keeling) Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cc.svg'},
      { сountry: 'Colombia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/co.svg'},
      { сountry: 'Comoros', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/km.svg'},
      { сountry: 'Cook Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ck.svg'},
      { сountry: 'Costa Rica', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cr.svg'},
      { сountry: 'Croatia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/hr.svg'},
      { сountry: 'Cuba', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cu.svg'},
      { сountry: 'Curaçao', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cw.svg'},
      { сountry: 'Cyprus', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cy.svg'},
      { сountry: 'Czech Republic', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cz.svg'},
      { сountry: 'Côte d`Ivoire', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ci.svg'},
      { сountry: 'Democratic Republic of the Congo', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cd.svg'},
      { сountry: 'Denmark', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/dk.svg'},
      { сountry: 'Djibouti', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/dj.svg'},
      { сountry: 'Dominica', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/dm.svg'},
      { сountry: 'Dominican Republic', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/do.svg'},
      { сountry: 'Ecuador', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ec.svg'},
      { сountry: 'Egypt', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/eg.svg'},
      { сountry: 'El Salvador', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sv.svg'},
      { сountry: 'England', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gb-eng.svg'},
      { сountry: 'Equatorial Guinea', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gq.svg'},
      { сountry: 'Eritrea', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/er.svg'},
      { сountry: 'Estonia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ee.svg'},
      { сountry: 'Ethiopia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/et.svg'},
      { сountry: 'Falkland Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/fk.svg'},
      { сountry: 'Faroe Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/fo.svg'},
      { сountry: 'Federated States of Micronesia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/fm.svg'},
      { сountry: 'Fiji', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/fj.svg'},
      { сountry: 'Finland', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/fi.svg'},
      { сountry: 'France', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/fr.svg'},
      { сountry: 'French Guiana', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gf.svg'},
      { сountry: 'French Polynesia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/pf.svg'},
      { сountry: 'French Southern Territories', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tf.svg'},
      { сountry: 'Gabon', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ga.svg'},
      { сountry: 'Gambia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gm.svg'},
      { сountry: 'Georgia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ge.svg'},
      { сountry: 'Germany', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/de.svg'},
      { сountry: 'Ghana', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gh.svg'},
      { сountry: 'Gibraltar', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gi.svg'},
      { сountry: 'Greece', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gr.svg'},
      { сountry: 'Greenland', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gl.svg'},
      { сountry: 'Grenada', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gd.svg'},
      { сountry: 'Guadeloupe', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gp.svg'},
      { сountry: 'Guam', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gt.svg'},
      { сountry: 'Guatemala', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gt.svg'},
      { сountry: 'Guernsey', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gg.svg'},
      { сountry: 'Guinea', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gn.svg'},
      { сountry: 'Guinea-Bissau', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gw.svg'},
      { сountry: 'Guyana', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gy.svg'},
      { сountry: 'Haiti', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ht.svg'},
      { сountry: 'Holy See', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/va.svg'},
      { сountry: 'Honduras', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/hn.svg'},
      { сountry: 'Hong Kong', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/hk.svg'},
      { сountry: 'Hungary', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/hu.svg'},
      { сountry: 'Iceland', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/is.svg'},
      { сountry: 'India', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/in.svg'},
      { сountry: 'Indonesia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/id.svg'},
      { сountry: 'Iran (Islamic Republic of)', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ir.svg'},
      { сountry: 'Iraq', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/iq.svg'},
      { сountry: 'Ireland', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ie.svg'},
      { сountry: 'Isle of Man', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/im.svg'},
      { сountry: 'Israel', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/il.svg'},
      { сountry: 'Italy', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/it.svg'},
      { сountry: 'Jamaica', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/jm.svg'},
      { сountry: 'Japan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/jp.svg'},
      { сountry: 'Jersey', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/je.svg'},
      { сountry: 'Jordan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/jo.svg'},
      { сountry: 'Kazakhstan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/kz.svg'},
      { сountry: 'Kenya', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ke.svg'},
      { сountry: 'Kiribati', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ki.svg'},
      { сountry: 'Kosovo', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/xk.svg'},
      { сountry: 'Kuwait', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/kw.svg'},
      { сountry: 'Kyrgyzstan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/kg.svg'},
      { сountry: 'Laos', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/la.svg'},
      { сountry: 'Latvia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/lv.svg'},
      { сountry: 'Lebanon', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/lb.svg'},
      { сountry: 'Lesotho', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ls.svg'},
      { сountry: 'Liberia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/lr.svg'},
      { сountry: 'Libya', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ly.svg'},
      { сountry: 'Liechtenstein', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/li.svg'},
      { сountry: 'Lithuania', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/lt.svg'},
      { сountry: 'Luxembourg', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/lu.svg'},
      { сountry: 'Macau', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mo.svg'},
      { сountry: 'Madagascar', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mg.svg'},
      { сountry: 'Malawi', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mw.svg'},
      { сountry: 'Malaysia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/my.svg'},
      { сountry: 'Maldives', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mv.svg'},
      { сountry: 'Mali', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ml.svg'},
      { сountry: 'Malta', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mt.svg'},
      { сountry: 'Marshall Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mh.svg'},
      { сountry: 'Martinique', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mq.svg'},
      { сountry: 'Mauritania', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mr.svg'},
      { сountry: 'Mauritius', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mu.svg'},
      { сountry: 'Mayotte', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/yt.svg'},
      { сountry: 'Mexico', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mx.svg'},
      { сountry: 'Moldova', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/md.svg'},
      { сountry: 'Monaco', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mc.svg'},
      { сountry: 'Mongolia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mn.svg'},
      { сountry: 'Montenegro', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/me.svg'},
      { сountry: 'Montserrat', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ms.svg'},
      { сountry: 'Morocco', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ma.svg'},
      { сountry: 'Mozambique', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mz.svg'},
      { сountry: 'Myanmar', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mm.svg'},
      { сountry: 'Namibia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/na.svg'},
      { сountry: 'Nauru', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/nr.svg'},
      { сountry: 'Nepal', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/np.svg'},
      { сountry: 'Netherlands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/nl.svg'},
      { сountry: 'New Caledonia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/nc.svg'},
      { сountry: 'New Zealand', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/nz.svg'},
      { сountry: 'Nicaragua', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ni.svg'},
      { сountry: 'Niger', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ne.svg'},
      { сountry: 'Nigeria', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ng.svg'},
      { сountry: 'Niue', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/nu.svg'},
      { сountry: 'Norfolk Island', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/nf.svg'},
      { сountry: 'North Korea', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/kp.svg'},
      { сountry: 'North Macedonia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mk.svg'},
      { сountry: 'Northern Ireland', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gb-nir.svg'},
      { сountry: 'Northern Mariana Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mp.svg'},
      { сountry: 'Norway', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/no.svg'},
      { сountry: 'Oman', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/om.svg'},
      { сountry: 'Pakistan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/pk.svg'},
      { сountry: 'Palau', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/pw.svg'},
      { сountry: 'Panama', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/pa.svg'},
      { сountry: 'Papua New Guinea', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/pg.svg'},
      { сountry: 'Paraguay', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/py.svg'},
      { сountry: 'Peru', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/pe.svg'},
      { сountry: 'Philippines', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ph.svg'},
      { сountry: 'Pitcairn', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/pn.svg'},
      { сountry: 'Poland', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/pl.svg'},
      { сountry: 'Portugal', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/pt.svg'},
      { сountry: 'Puerto Rico', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/pr.svg'},
      { сountry: 'Qatar', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/qa.svg'},
      { сountry: 'Republic of the Congo', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/cg.svg'},
      { сountry: 'Romania', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ro.svg'},
      { сountry: 'Russia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ru.svg'},
      { сountry: 'Rwanda', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/rw.svg'},
      { сountry: 'Réunion', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/re.svg'},
      { сountry: 'Saint Barthélemy', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/bl.svg'},
      { сountry: 'Saint Helena, Ascension and Tristan da Cunha', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sh.svg'},
      { сountry: 'Saint Kitts and Nevis', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/kn.svg'},
      { сountry: 'Saint Lucia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/lc.svg'},
      { сountry: 'Saint Martin', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/mf.svg'},
      { сountry: 'Saint Pierre and Miquelon', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/pm.svg'},
      { сountry: 'Saint Vincent and the Grenadines', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/vc.svg'},
      { сountry: 'Samoa', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ws.svg'},
      { сountry: 'San Marino', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sm.svg'},
      { сountry: 'Sao Tome and Principe', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/st.svg'},
      { сountry: 'Saudi Arabia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sa.svg'},
      { сountry: 'Scotland', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gb-sct.svg'},
      { сountry: 'Senegal', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sn.svg'},
      { сountry: 'Serbia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/rs.svg'},
      { сountry: 'Seychelles', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sc.svg'},
      { сountry: 'Sierra Leone', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sl.svg'},
      { сountry: 'Singapore', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sg.svg'},
      { сountry: 'Sint Maarten', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sx.svg'},
      { сountry: 'Slovakia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sk.svg'},
      { сountry: 'Slovenia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/si.svg'},
      { сountry: 'Solomon Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sb.svg'},
      { сountry: 'Somalia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/so.svg'},
      { сountry: 'South Africa', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/za.svg'},
      { сountry: 'South Georgia and the South Sandwich Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gs.svg'},
      { сountry: 'South Korea', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/kr.svg'},
      { сountry: 'South Sudan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ss.svg'},
      { сountry: 'Spain', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/es.svg'},
      { сountry: 'Sri Lanka', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/lk.svg'},
      { сountry: 'State of Palestine', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ps.svg'},
      { сountry: 'Sudan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sd.svg'},
      { сountry: 'Suriname', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sr.svg'},
      { сountry: 'Svalbard and Jan Mayen', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sj.svg'},
      { сountry: 'Swaziland', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sz.svg'},
      { сountry: 'Sweden', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/se.svg'},
      { сountry: 'Switzerland', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ch.svg'},
      { сountry: 'Syrian Arab Republic', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/sy.svg'},
      { сountry: 'Taiwan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tw.svg'},
      { сountry: 'Tajikistan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tj.svg'},
      { сountry: 'Tanzania', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tz.svg'},
      { сountry: 'Thailand', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/th.svg'},
      { сountry: 'Timor-Leste', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tl.svg'},
      { сountry: 'Togo', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tg.svg'},
      { сountry: 'Tokelau', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tk.svg'},
      { сountry: 'Tonga', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/to.svg'},
      { сountry: 'Trinidad and Tobago', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tt.svg'},
      { сountry: 'Tunisia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tn.svg'},
      { сountry: 'Turkey', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tr.svg'},
      { сountry: 'Turkmenistan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tm.svg'},
      { сountry: 'Turks and Caicos Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tc.svg'},
      { сountry: 'Tuvalu', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/tv.svg'},
      { сountry: 'Uganda', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ug.svg'},
      { сountry: 'Ukraine', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ua.svg'},
      { сountry: 'United Arab Emirates', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ae.svg'},
      { сountry: 'United Kingdom', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gb.svg'},
      { сountry: 'United States Minor Outlying Islands', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/um.svg'},
      { сountry: 'United States of America', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/us.svg'},
      { сountry: 'Uruguay', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/uy.svg'},
      { сountry: 'Uzbekistan', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/uz.svg'},
      { сountry: 'Vanuatu', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/vu.svg'},
      { сountry: 'Venezuela (Bolivarian Republic of)', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ve.svg'},
      { сountry: 'Vietnam', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/vn.svg'},
      { сountry: 'Virgin Islands (British)', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/vg.svg'},
      { сountry: 'Virgin Islands (U.S.)', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/vi.svg'},
      { сountry: 'Wales', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/gb-wls.svg'},
      { сountry: 'Wallis and Futuna', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/wf.svg'},
      { сountry: 'Western Sahara', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/eh.svg'},
      { сountry: 'Yemen', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/ye.svg'},
      { сountry: 'Zambia', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/zm.svg'},
      { сountry: 'Zimbabwe', image: 'https://lipis.github.io/flag-icon-css/flags/1x1/zw.svg'},
    ],
  }),

  computed: mapGetters({
    user: "auth/user",
    
  }),
 
  created() {
      this.form = {...this.user.EmployerData}
    // this.form.name = this.user.name
    // this.form.email = this.user.email

    
  }, 
 
  methods: {
    async update() {
        console.log(typeof this.city_data,this.city_data)
        if(typeof this.city_data === 'object'  && this.city_data !== null){
            this.form.city = this.city_data.name
        }
        if(typeof this.address_data === 'object'  && this.address_data !== null){
            this.form.address = this.address_data.name
        }
        // console.log(this.form)
         console.log(this.form)
      const { data } = await this.$axios.post("/profile/employer/update", this.form);
      await this.$store.dispatch('auth/fetchUser')
      this.$vueOnToast.pop('success', this.$t('info_updated'))  
    //   if(data.payload == "ok"){
    //     this.$vueOnToast.pop('success', this.$t('info_updated'))  
    //     this.$store.dispatch('auth/fetchUser')
    //   }
    },

  },
};
</script>
<style lang="scss" >
.ap-footer{
   display: none;
}
.ap-dropdown-menu{
    background-color: black;
}
.ap-suggestion.ap-cursor:hover{
   background: #413b45ba;
}
.ap-input{
    color: white;
}
</style>