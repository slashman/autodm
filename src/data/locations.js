export default [
  {
    id: 'lugunum',
    name: 'Lugunum',
    type: 'plaza',
    important: true,
    x: 2599,
    y: 3199,
    connections: [
      {
        to: 'lugunumPub'
      },
      {
        to: 'forestRoad1'
      }
    ]
  },
  {
    id: 'lugunumPub',
    name: 'Pub',
    important: true,
    type: 'pub',
    x: 2599,
    y: 3199
  },
  {
    id: 'forestRoad1',
    name: 'Forest Road 1',
    x: 2576,
    y: 3247,
    connections: [
      {
        to: 'agrorum'
      },
      {
        to: 'forestRoad2'
      }
    ]
  },
  {
    id: 'agrorum',
    name: 'Agrorum',
    type: 'plaza',
    x: 2622,
    y: 3243,
    important: true,
    connections: [
      {
        to: 'agrorumPub'
      }
    ]
  },
  {
    id: 'agrorumPub',
    name: 'Pub',
    x: 2622,
    y: 3243,
    important: true,
    type: 'pub'
  },
  {
    id: 'forestRoad2',
    name: 'Forest Road 2',
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
    type: 'plaza',
    x: 2643,
    y: 3380,
    important: true
  },
  {
    id: 'borum',
    name: 'Borum',
    type: 'plaza',
    x: 2472,
    y: 3266,
    important: true
  },
];