<template>
  <v-sheet border width="300px">
    <v-container>
      <v-row>
        <v-col cols="1">
          <v-row>
            <v-btn
              class="btn-icon-only"
              height="100%"
              icon="mdi-menu-up"
              rounded="0"
            />
          </v-row>
          <v-row v-if="showListTotal" justify="center">
            <p>0</p>
          </v-row>
          <v-row>
            <v-btn
              class="btn-icon-only"
              height="100%"
              icon="mdi-menu-down"
              rounded="0"
            />
          </v-row>
        </v-col>
        <v-col cols="11">
          <v-sheet />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script lang="ts" setup>
  interface ListProps {
    count?: boolean;
  }
  const props = defineProps<ListProps>()

  const showListTotal = ref(props.count ?? false);
</script>

<style scoped>
.btn-icon-only {
  padding: 0px;
  margin: 0px;
  font-size: 22px;
}
</style>
