<template>
  <v-app :id="textStatusCode">
    <v-container fluid fill-height>
      <v-layout align-center justify-center row>
        <v-flex v-if="textStatusCode" xs3 mr-3>
          <v-img :src="errorImage" :alt="textStatusCode" />
        </v-flex>
        <div class="text-md-center">
          <h1>{{ textStatusCode }}</h1>
          <h2 class="my-3 headline">
            {{ errorText }}
          </h2>
          <div>
            <v-btn color="accent" to="/">
              Go Home
            </v-btn>
          </div>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      title: this.shortErrorText
    }
  },
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      textStatusCode: '',
      errorText: '',
      shortErrorText: ''
    }
  },
  computed: {
    errorImage() {
      return '/error/' + this.textStatusCode + '.svg'
    }
  },
  created() {
    this.setErrorInfo()
  },
  methods: {
    setErrorInfo() {
      this.textStatusCode = this.error.statusCode.toString()

      switch (this.error.statusCode) {
        case 403:
          this.shortErrorText = 'Access Denied'
          this.errorText = 'Sorry, access denied.'
          break
        case 404:
          this.shortErrorText = 'Not Found'
          this.errorText = 'Sorry, page not found.'
          break
        case 500:
          this.shortErrorText = 'Server Down'
          this.errorText = 'Sorry, the server is down.'
          break
        default:
          this.shortErrorText = 'Unexpected Error'
          this.errorText = 'Sorry, unexpected error occurred.'
          break
      }
    }
  },
  layout: 'empty'
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 150px;
  line-height: 150px;
  font-weight: 700;
  color: #ffffff;
  text-shadow: rgba(255, 255, 255, 0.3) 1px 1px,
    rgba(255, 255, 255, 0.2) 2px 2px, rgba(255, 255, 255, 0.3) 3px 3px;
}
</style>
