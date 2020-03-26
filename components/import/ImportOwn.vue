<template>
  <v-card>
    <v-card-text class="pt-4">
      <div class="help">
        <v-icon color="blue" small>mdi-help-circle-outline</v-icon>
        {{ $t('import.own.convert') }}
        <a
          href="https://www.aconvert.com/document/xls-to-csv/"
          target="_blank"
          >{{ $t('import.own.click_here') }}</a
        >.
      </div>
      <div class="help">
        <v-icon color="red" small>mdi-alert-outline</v-icon>
        <span v-html="$t('import.own.disclaimer')" />
      </div>
      <div class="form-group">
        <div class="col-sm-9">
          <v-file-input
            id="fileloader"
            v-model="file"
            :rules="rules"
            :label="this.$t('import.own.file_label')"
            @change="loadFile()"
            type="file"
            accept=".csv, .json, .xls, .xlsx"
            show-size
            outlined
            color="blue"
            prepend-icon="mdi-upload"
            class="form-control"
          />
          <v-layout justify-space-between>
            <v-btn
              v-if="json"
              @click="saveDataset()"
              large
              outlined
              color="white"
              depressed
              ><v-icon>mdi-scatter-plot-outline</v-icon>
              {{ $t('import.own.button') }}
            </v-btn>
            <v-switch
              v-if="file && file.size <= 1500000"
              v-model="preview"
              :label="this.$t('import.own.preview')"
              color="blue"
            />
          </v-layout>
        </div>
      </div>
      <div v-if="hasError">
        <br />
        <h4 class="apierror">{{ error }}</h4>
        <br />
      </div>
      <table v-if="json && preview">
        <thead>
          <tr>
            <th
              v-for="key in parse_header"
              :key="key"
              :class="{ active: sortKey === key }"
              @click="sortBy(key)"
            >
              {{ key | capitalize }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="csv in json.slice(0, 5)" :key="csv">
            <td v-for="key in parse_header" :key="key">
              {{ csv[key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </v-card-text>
  </v-card>
</template>
<script>
import XLXS from 'xlsx'
import axios from '~/plugins/axios'
export default {
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      file: null,
      json: null,
      dataset: null,
      preview: false,
      error: '',
      hasError: false,
      parse_header: [],
      sortOrders: {},
      sortKey: '',
      rules: [
        (value) => !value || value.size < 1500000 || this.$t('import.own.error')
      ]
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    loadFile() {
      this.hasError = false
      if (this.file && this.file.size <= 1500000) {
        const extension = this.file.name.split('.').pop()
        switch (extension) {
          case 'csv':
            this.loadCSV()
            break
          case 'txt':
            this.loadCSV()
            break
          case 'json':
            this.loadJson()
            break
          case 'xls':
            this.loadExcel()
            break
          case 'xlsx':
            this.loadExcel()
            break
          default:
            // eslint-disable-next-line
            console.log(extension)
            break
        }
        setTimeout(() => {
          if (!this.json) {
            this.hasError = true
            this.error = this.$t('import.own.error_format')
          }
        }, 200)
      } else {
        this.json = null
        this.preview = false
      }
    },
    loadCSV() {
      const self = this
      if (window.FileReader) {
        const reader = new FileReader()
        reader.readAsText(this.file)
        // Handle errors load
        reader.onload = function(event) {
          const csv = event.target.result
          self.csvJSON(csv)
        }
        reader.onerror = function(evt) {
          if (evt.target.error.name === 'NotReadableError') {
            alert('Cannot read file !')
          }
        }
      } else {
        alert('FileReader are not supported in this browser.')
      }
    },
    loadJson() {
      const self = this
      if (window.FileReader) {
        const reader = new FileReader()
        reader.readAsText(this.file)
        // Handle errors load
        reader.onload = function(event) {
          self.json = JSON.parse(event.target.result)
          self.parse_header = Object.keys(self.json[0])
        }
        reader.onerror = function(evt) {
          if (evt.target.error.name === 'NotReadableError') {
            alert('Cannot read file !')
          }
        }
      } else {
        alert('FileReader are not supported in this browser.')
      }
    },
    loadExcel() {
      const self = this
      if (window.FileReader) {
        const reader = new FileReader()
        reader.readAsBinaryString(this.file)
        reader.onload = function(event) {
          self.json = event.target.result
          const workbook = XLXS.read(self.json, {
            type: 'binary',
            cellDates: true,
            cellNF: false,
            cellText: false
          })
          self.json = XLXS.utils.sheet_to_row_object_array(
            workbook.Sheets[workbook.SheetNames[0]],
            { dateNF: 'YYYY-MM-DD' }
          )
          self.parse_header = Object.keys(self.json[0])
        }
        reader.onerror = function(event) {
          alert('Error : ' + event.target.error.code)
        }
      } else {
        alert('FileReader are not supported in this browser.')
      }
    },
    csvJSON(csv) {
      const self = this
      const lines = csv.split('\n')
      const result = []
      const headers = lines[0].split(',')
      self.parse_header = lines[0].split(',')
      lines[0].split(',').forEach(function(key) {
        self.sortOrders[key] = 1
      })
      lines.map(function(line, indexLine) {
        if (indexLine < 1) return // Jump header line
        const obj = {}
        const currentline = line.split(',')
        headers.map(function(header, indexHeader) {
          obj[header] = currentline[indexHeader]
        })
        result.push(obj)
      })
      result.pop() // remove the last item because undefined values
      this.json = result
    },
    async saveDataset() {
      await axios
        .post('/datasets/save', {
          name: this.file.name,
          data: this.json,
          size: this.file.size.toFixed(2),
          id_user: this.user.id
        })
        .then((res) => {
          this.dataset = res.data
          this.$router.push({
            name: `data-id___${this.$i18n.locale}`,
            params: { id: res.data.id }
          })
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          this.hasError = true
          this.error = this.$t('import.own.' + error.response.data.error)
        })
    }
  }
}
</script>
<style scoped>
.help {
  font-size: smaller;
  color: lightgray;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  height: 100px;
  overflow-y: scroll;
}
td,
th {
  border: 1px solid white;
  text-align: left;
  padding: 8px;
  font-size: smaller;
}

tr:nth-child(even) {
  background-color: #1565c0;
  color: whitesmoke;
}

.apierror {
  color: lightcoral;
  text-align: center;
}
</style>
