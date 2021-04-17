<template>
  <v-container fill-height grid-list-xs>
    <v-layout column>
      <v-flex class="d-flex flex-column align-center justify-center">
        <div>
          <v-btn @click="getUser">click</v-btn>
        </div>
        <div>
          {{ user_info.user_name }}
        </div>
        <div>
          {{ user_info.user_age }}
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$emit("Title", "ログイン");
  },
  data() {
    return {
      user_id: 1,
      user_info: { user_name: null, user_age: null },
    };
  },
  methods: {
    getUser() {
      this.$http.get(`/api/home/${this.user_id}`).then((response) => {
        if (response.data.message == "good") {
          this.user_info = response.data.result[0];
        } else {
        }
      });
    },
  },
};
</script>

<style scope>
</style>