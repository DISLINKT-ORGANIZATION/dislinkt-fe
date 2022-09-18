<template>
    <v-container fluid>
      <v-row align="center" justify="center" min-width="800px">
        <v-col cols="6">
          <v-card class="mt-6">
            <div class="description ml-8 pt-5">Events</div>
                <v-data-table
                    :headers="headers"
                    :items="events"
                    :items-per-page="10"
                    class="elevation-1"
                >
                <template v-slot:item.timestamp="{ item }">
                <span>{{ new Date(item.timestamp).toLocaleString() }}</span>
                </template></v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  const eventsApi = "logging-service/events";
  export default {
    name: "EventsView",
    data() {
      return {
        events: [],
        headers: [
            { text: 'Timestamp', value: 'timestamp' },
            { text: 'Message', value: 'content' },
            { text: 'Type', value: 'type' },
        ]
      };
    },
    mounted() {
        this.getEvents();
    },
    methods: {
      getEvents() {
        this.axios
          .get(eventsApi)
          .then((response) => {
            // get all user ids
            this.events = response.data
            console.log(this.events)
            console.log(response.data)
          })
          .catch(() => {
            this.$root.snackbar.error();
          });
      },
    }
  };  
  </script>
  
  <style scoped>
  .description {
    font-family: "Baloo2", Helvetica, Arial;
    font-size: 35px;
    color: black;
  }
  </style>
  