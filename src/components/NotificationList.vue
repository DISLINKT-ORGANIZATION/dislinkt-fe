<template>
  <v-list two-line class="pr-5 scrollable-list">
    <template v-for="(notification, index) in notifications">
      <v-list-item ripple class="text" :key="index" @click="redirect(notification)">
        <v-list-item-icon>
          <v-icon class="pt-3">{{ getNotificationIcon(notification.eventType) }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            >{{ getNotificationText(notification.eventType) }} from
            {{ notification.firstName }}
            {{ notification.lastName }}</v-list-item-title
          >
          <v-list-item-subtitle>
            @{{ notification.username }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-list-item-action-text>
              {{formatDate(notification.timestamp)}}
            </v-list-item-action-text>
          </v-list-item-action>
      </v-list-item>
      <v-divider v-if="index != notifications.length - 1" :key="`d-${index}`" />
    </template>
  </v-list>
</template>

<script>
const notificationUrl = "/notification-service/notifications/user/";
const usersApi = "auth-service/authentication/users/ids";

export default {
  name: "NotificationList",
  props: {},
  data() {
    return {
      userId: localStorage.getItem("id"),
      notifications: [],
      users: [],
    };
  },
  mounted() {
    this.getNotifications();
  },
  components: {},
  methods: {
    getNotifications() {
      this.axios.get(notificationUrl + this.userId).then(async (response) => {
        let ids = response.data.map((el) => el.senderId);
        let usersAxios = await this.axios.post(usersApi, { ids: ids });
        let users = usersAxios.data;
        this.notifications = response.data.map((el, idx) => ({
          senderId: el.senderId,
          firstName: users[idx].firstName,
          lastName: users[idx].lastName,
          username: users[idx].username,
          email: users[idx].email,
          timestamp: el.timestamp,
          eventType: el.notificationType,
        }));
      });
    },
    getNotificationText(eventType) {
      switch (eventType) {
        case "MESSAGE_SENT":
          return "New message ";
      }
    },
    getNotificationIcon(eventType) {
      switch (eventType) {
        case "MESSAGE_SENT":
          return "mdi-email-outline";
      }
    },
    formatDate(date) {
      let d = new Date(date);
      let elements = d.toString().split("GMT")[0];
      let allParts = elements.split(" ");
      let newAllParts = allParts.filter(el => el);
      return [newAllParts[newAllParts.length-1], ...newAllParts.slice(0,newAllParts.length-1)].join(" ");
    },
    redirect(notification) {
      switch(notification.eventType) {
        case "MESSAGE_SENT":
        this.$router.push({ name: "ChatRoom", params: { recipientId: notification.senderId } });
      }
    }
  },
};
</script>
