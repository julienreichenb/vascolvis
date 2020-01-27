import Vue from 'vue'
import Colvis from 'colvis-client'
import 'colvis-client/dist/colvis-client.css'

const specs = {
  visualization: {
    container: '#vis'
  },
  natures: [
    {
      id: 'number',
      annotable: {
        selector: 'path',
        filter: 'annotable',
        title: ''
      }
    },
    {
      id: 'position',
      annotable: false
    }
  ],
  combinations: [
    {
      first: 'number',
      second: 'position',
      products: [
        {
          id: 'sequence',
          type: 'Number',
          rangeType: 'linear',
          range: [1, 10]
        }
      ]
    }
  ]
}

Vue.use(Colvis, specs)
