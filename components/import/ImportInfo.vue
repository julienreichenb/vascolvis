<template>
  <v-card>
    <v-card-title v-text="this.$t('import.howitworks.top')"> </v-card-title>
    <v-card-text>
      <p v-html="this.$t('import.howitworks.intro')"></p>
    </v-card-text>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header
          v-text="this.$t('import.howitworks.csv_title')"
        >
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p v-html="this.$t('import.howitworks.csv')"></p>
          <div class="img-container">
            <img src="~/static/import/csv_exemple.png" />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          v-text="this.$t('import.howitworks.json_title')"
        >
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p v-html="this.$t('import.howitworks.json')"></p>
          <div class="img-container json">
            <img src="~/static/import/json_exemple.png" />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header
          v-text="this.$t('import.howitworks.excel_title')"
        >
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p v-html="this.$t('import.howitworks.excel')"></p>
          <div class="img-container excel">
            <img src="~/static/import/excel_exemple.png" />
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<style scoped>
.img-container {
  padding: 0.5em;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #eee;
  background-color: #47494e;
}

.json > img {
  max-height: 250px !important;
}

.excel > img {
  max-height: 150px !important;
}

img {
  padding: 0;
  margin: 0;
  max-height: 100px;
  max-width: 95%;
}
</style>
