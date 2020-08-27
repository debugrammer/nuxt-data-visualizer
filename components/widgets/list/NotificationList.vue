<template>
  <v-card class="elevation-0">
    <v-app-bar flat dense color="transparent">
      <v-toolbar-title>
        <h4 class="font-weight-light">Notification</h4>
      </v-toolbar-title>
    </v-app-bar>
    <v-divider />
    <v-card-text class="pa-0">
      <v-list v-if="unreadCount > 0" two-line class="pa-0">
        <template v-for="(item, index) in notification">
          <v-subheader v-if="item.header" :key="index">
            {{ item.header }}
          </v-subheader>
          <v-divider v-else-if="item.divider" :key="index" />
          <v-list-item v-else :key="index">
            <v-list-item-avatar :color="item.color">
              <v-icon v-if="item.icon" dark>
                {{ item.icon }}
              </v-icon>
              <span v-else :class="item.avatarTextClass">
                {{ item.avatarText }}
              </span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
              <v-list-item-subtitle>
                <span v-if="item.subtitle" class="text--primary">
                  {{ item.subtitle }}
                </span>
                <span v-if="item.subtitle"> &mdash; </span>
                {{ item.content }}
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="caption">
              {{ item.timeLabel }}
            </v-list-item-action>
          </v-list-item>
        </template>
      </v-list>
      <v-list v-else two-line class="pa-0">
        <v-list-item>
          <v-list-item-avatar color="grey">
            <v-icon dark>mdi-bell</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle>
              You don't have any notifications yet
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action class="caption">-</v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-btn block text class="ma-0">All</v-btn>
      <v-divider />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NotificationList',
  computed: {
    ...mapGetters({
      notification: 'notification/getData',
      unreadCount: 'notification/getUnreadCount'
    })
  }
}
</script>
