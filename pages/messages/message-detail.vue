<template>
  <div id="page-messages-message-detail">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg12 sm12 xs12 pb-1>
          <v-form v-model="valid" lazy-validation @submit.prevent>
            <v-text-field
              v-model="requestId"
              :rules="[() => !!requestId || 'This field is required']"
              label="API Request ID"
              type="text"
              clear-icon="mdi-close"
              autofocus
              outlined
              clearable
              @focus="focusIconColor()"
              @blur="blurIconColor()"
            >
              <template v-slot:prepend-inner>
                <v-fade-transition leave-absolute>
                  <v-progress-circular
                    v-if="loading"
                    size="28"
                    color="accent"
                    indeterminate
                  />
                  <v-icon v-else medium :color="iconColor">
                    mdi-magnify
                  </v-icon>
                </v-fade-transition>
              </template>
            </v-text-field>
          </v-form>
        </v-flex>
        <v-flex lg12 sm12 xs12>
          <v-card>
            <template v-for="(category, i) in list.listData">
              <v-subheader v-if="category.title" :key="category.title">
                {{ category.title }}
              </v-subheader>
              <template v-for="item in category.items">
                <v-card-title
                  v-if="item.title"
                  :key="item.title"
                  :class="item.cardTitleClass"
                >
                  <v-btn
                    v-if="item.icon"
                    :color="item.iconColor"
                    text
                    icon
                    medium
                    @click="dialog = true"
                  >
                    <v-icon medium>
                      {{ item.icon }}
                    </v-icon>
                  </v-btn>
                  <v-btn v-else text icon medium disabled />
                  <div>
                    <div>
                      <v-tooltip color="accent" right>
                        <template v-slot:activator="{ on }">
                          <span class="subtitle-2" v-on="on">
                            {{ item.title }}
                          </span>
                        </template>
                        <span>{{ item.description }}</span>
                      </v-tooltip>
                    </div>
                    <v-json v-if="item.json" :data="item.content">
                      <span slot="error-content" class="subtitle-1 grey--text">
                        {{ item.content }}
                      </span>
                    </v-json>
                    <span v-else class="subtitle-1 grey--text">
                      {{ item.content }}
                    </span>
                  </div>
                </v-card-title>
              </template>
              <v-divider v-if="category.divider" :key="i" />
            </template>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <message-dialog />
  </div>
</template>

<script>
import qs from 'qs'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import VJson from '~/components/VJson'
import MessageDialog from '~/components/widgets/dialog/MessageDialog'

export default {
  head() {
    return {
      title: 'Message Detail - Messages'
    }
  },
  components: {
    VJson,
    MessageDialog
  },
  data() {
    return {
      valid: true,
      requestId: '',
      iconColor: ''
    }
  },
  computed: {
    ...mapGetters({
      copyLink: 'copy-link/getAction',
      list: 'visualize/message-detail/getList'
    }),
    dialog: {
      set(show) {
        this.$store.commit('dialog/setShow', show)
      },
      get() {
        return this.$store.state.dialog.show
      }
    },
    loading() {
      return this.requestId && !this.list.loaded
    }
  },
  watch: {
    copyLink(copyLink) {
      if (copyLink !== true) {
        return
      }

      const params = qs.stringify({ request_id: this.requestId })
      const fullUrl = `${this.pageUrl}?${params}`

      this.$copyText(fullUrl).then(
        (e) => {
          this.$store.dispatch('snackbar/success', {
            text: 'Link copied to clipboard'
          })
        },
        (error) => {
          this.$store.dispatch('snackbar/error', {
            text: `Unable to copy: ${error.message}`
          })
        }
      )

      this.$store.commit('copy-link/setAction', false)
    },
    requestId() {
      if (!this.requestId) {
        return
      }

      this.debouncedLoadList()
    },
    valid() {
      if (this.valid !== true) {
        this.iconColor = 'error'
        return
      }

      this.iconColor = 'primary'
    }
  },
  asyncData({ route }) {
    return {
      pageUrl: `${process.env.WEB_CLIENT_URL}${route.path}`,
      params: {
        requestId: route.query.request_id || ''
      }
    }
  },
  created() {
    this.debouncedLoadList = _.debounce(this.loadList, 500)
  },
  mounted() {
    this.requestId = this.params.requestId || this.requestId
  },
  methods: {
    focusIconColor() {
      if (this.valid !== true) {
        return
      }

      this.iconColor = 'primary'
    },
    blurIconColor() {
      if (this.valid !== true) {
        return
      }

      this.iconColor = ''
    },
    async loadList() {
      try {
        await this.$store.dispatch(
          'visualize/message-detail/fetchList',
          this.requestId
        )
      } catch (error) {
        this.$store.dispatch('snackbar/error', {
          text: `Failed to load list data: ${error.message}`
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-card__title {
  flex-wrap: nowrap;
}
span {
  word-break: break-word;
}
</style>
