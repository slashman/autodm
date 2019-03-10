export default [
  {
    id: 'lugunum',
    name: 'Lugunum',
    type: 'town',
    x: 2599,
    y: 3199,
    connections: [
      {
        to: 'lugunumForest'
      }
    ]
  },
  {
    id: 'lugunumForest',
    name: 'Lugunum Forest',
    type: 'forest',
    x: 2576,
    y: 3247,
    connections: [
      {
        to: 'agrorum'
      },
      {
        to: 'borumForest'
      }
    ]
  },
  {
    id: 'agrorum',
    name: 'Agrorum',
    type: 'town',
    x: 2622,
    y: 3243
  },
  {
    id: 'borumForest',
    name: 'Borum Forest',
    type: 'forest',
    x: 2529,
    y: 3275,
    connections: [
      {
        to: 'aqugus'
      },
      {
        to: 'borum'
      }
    ]
  },
  {
    id: 'aqugus',
    name: 'Aqugus',
    type: 'town',
    x: 2643,
    y: 3380
  },
  {
    id: 'borum',
    name: 'Borum',
    type: 'town',
    x: 2472,
    y: 3266
  },
];