<template>
  <v-container fluid class="list-container">
    <div class="description ml-4 mt-2">Chat</div>
      <v-list two-line class="pr-5 scrollable-list">
        <template v-for="(item, index) in items">
          <router-link
            :key="index"
            :to="{
              name: 'ChatRoom',
              params: { chatId: item.id, connectionName: item.connectionName },
            }"
            v-slot="{ navigate }"
          >
            <v-list-item ripple @click="navigate">
              <v-list-item-avatar>
                <img :src="item.avatar" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="item.subtitle"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </template>
      </v-list>
  </v-container>
</template>
<script>
export default {
  name: "ConnectionList",
  data() {
    return {
      items: [
        {
          id: 1,
          connectionName: "Vera Kovacevic",
          avatar: "https://picsum.photos/250/300?image=660",
          title: "Meeting @ Noon",
          subtitle: `<span class="font-weight-bold">Spike Lee</span> &mdash; I'll be in your neighborhood`,
        },
        {
          id: 2,
          connectionName: "Mario Kujundzic",
          avatar: "https://picsum.photos/250/300?image=821",
          title: 'Summer BBQ <span class="grey--text text--lighten-1"></span>',
          subtitle:
            '<span class="font-weight-bold">to Operations support</span> &mdash; Wish I could come.',
        },
        {
          id: 3,
          connectionName: "Marija Radovic",
          avatar: "https://picsum.photos/250/300?image=783",
          title: "Yes yes",
          subtitle:
            '<span class="font-weight-bold">Bella</span> &mdash; Do you have Paris recommendations',
        },
        {
          id: 4,
          connectionName: "Ana Cvetkovic",
          avatar: "https://picsum.photos/250/300?image=1006",
          title: "Dinner tonight?",
          subtitle:
            '<span class="font-weight-bold">LaToya</span> &mdash; Do you want to hang out?',
        },
        {
          id: 5,
          avatar: "https://picsum.photos/250/300?image=146",
          title: "So long",
          subtitle:
            '<span class="font-weight-bold">Nancy</span> &mdash; Do you see what time it is?',
        },
        {
          id: 6,
          avatar: "https://picsum.photos/250/300?image=1008",
          title: "Breakfast?",
          subtitle:
            '<span class="font-weight-bold">LaToya</span> &mdash; Do you want to hang out?',
        },
        {
          id: 7,
          avatar: "https://picsum.photos/250/300?image=839",
          title:
            'Winter Porridge <span class="grey--text text--lighten-1"></span>',
          subtitle:
            '<span class="font-weight-bold">cc: Daniel</span> &mdash; Tell me more...',
        },
        {
          id: 8,
          avatar: "https://picsum.photos/250/300?image=145",
          title: "Oui oui",
          subtitle:
            '<span class="font-weight-bold">Nancy</span> &mdash; Do you see what time it is?',
        },
        {
          id: 9,
          avatar: "https://picsum.photos/250/300?image=145",
          title: "Oui oui",
          subtitle:
            '<span class="font-weight-bold">Nancy</span> &mdash; Do you see what time it is?',
        },
        {
          id: 10,
          avatar: "https://picsum.photos/250/300?image=145",
          title: "Oui oui",
          subtitle:
            '<span class="font-weight-bold">Nancy</span> &mdash; Do you see what time it is?',
        },
        // {
        //   id: 11,
        //   avatar: "https://picsum.photos/250/300?image=145",
        //   title: "Oui oui",
        //   subtitle:
        //     '<span class="font-weight-bold">Nancy</span> &mdash; Do you see what time it is?',
        // },
        // {
        //   id: 12,
        //   avatar: "https://picsum.photos/250/300?image=145",
        //   title: "Oui oui",
        //   subtitle:
        //     '<span class="font-weight-bold">Nancy</span> &mdash; Do you see what time it is?',
        // },
      ],
    };
  },
};
</script>

<style scoped>
.list-container {
  padding: 0 0 0 0;
  height: 100%;
}

.scrollable-list {
  overflow-y: auto;
  max-height: calc(100vh - 369px);
}
</style>
