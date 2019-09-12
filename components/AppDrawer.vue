<template>
  <v-navigation-drawer id="appDrawer" v-model="expanded" fixed app width="260">
    <v-toolbar color="secondary darken-1" dark>
      <v-img max-width="135" src="/logo.png" alt="Joonsang.com" />
      <v-toolbar-title class="body-1 ml-4 drawer-title">
        <v-row no-gutters>
          <v-col xs="12">
            <span>Data</span>
          </v-col>
          <v-col xs="12">
            <span>Visualizer</span>
          </v-col>
        </v-row>
      </v-toolbar-title>
    </v-toolbar>
    <perfect-scrollbar class="drawer-menu--scroll" :options="scrollSettings">
      <v-list dense expand>
        <template v-for="(item, i) in menu">
          <!--group with subitems-->
          <v-list-group
            v-if="item.items"
            :key="item.name"
            :group="item.group"
            :prepend-icon="item.icon"
            append-icon="mdi-chevron-down"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" />
              </v-list-item-content>
            </template>
            <template v-for="(subItem, j) in item.items">
              <!--sub group-->
              <v-list-group
                v-if="subItem.items"
                :key="subItem.name"
                :group="subItem.group"
                sub-group
              >
                <template v-slot:activator>
                  <v-list-item-content>
                    <v-list-item-title v-text="subItem.title" />
                  </v-list-item-content>
                </template>
                <v-list-item
                  v-for="(grand, k) in subItem.items"
                  :key="k"
                  :to="genChildTarget(item, grand)"
                  :href="grand.href"
                  ripple
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="grand.title" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-group>
              <!--child item-->
              <v-list-item
                v-else
                :key="j"
                :to="genChildTarget(item, subItem)"
                :href="subItem.href"
                :disabled="subItem.disabled"
                :target="subItem.target"
                ripple
              >
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.title" />
                </v-list-item-content>
                <v-list-item-action v-if="subItem.action">
                  <v-icon :class="[subItem.actionClass || 'success--text']">
                    {{ subItem.action }}
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
            </template>
          </v-list-group>
          <v-subheader v-else-if="item.header" :key="i">
            {{ item.header }}
          </v-subheader>
          <v-divider v-else-if="item.divider" :key="i" />
          <!--top-level link-->
          <v-list-item
            v-else
            :key="item.name"
            :to="!item.href ? { name: item.name } : null"
            :href="item.href"
            :disabled="item.disabled"
            :target="item.target"
            ripple
            rel="noopener"
          >
            <v-list-item-action v-if="item.icon">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
            <v-list-item-action v-if="item.subAction">
              <v-icon class="success--text">
                {{ item.subAction }}
              </v-icon>
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
    </perfect-scrollbar>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppDrawer',
  data() {
    return {
      scrollSettings: {
        maxScrollbarLength: 160
      }
    }
  },
  computed: {
    ...mapGetters({
      menu: 'menu/getMenu'
    }),
    expanded: {
      set(expanded) {
        this.$store.commit('drawer/setExpanded', expanded)
      },
      get() {
        return this.$store.state.drawer.expanded
      }
    }
  },
  methods: {
    genChildTarget(item, subItem) {
      if (subItem.href) {
        return
      }

      if (subItem.component) {
        return {
          name: subItem.component
        }
      }

      return { name: `${item.group}/${subItem.name}` }
    }
  }
}
</script>

<style lang="scss">
#appDrawer {
  .v-navigation-drawer__content {
    overflow-y: hidden;
  }
  .drawer-menu--scroll {
    height: calc(100vh - 48px);
    overflow: auto;
  }
  .drawer-title {
    font-family: 'Play', 'Roboto', sans-serif;
    line-height: 1.2;
  }
}
</style>
