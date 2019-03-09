export default [
  {
    id: 'lugunum',
    name: 'Lugunum',
    type: 'plaza',
    important: true,
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
    type: 'pub'
  },
  {
    id: 'forestRoad1',
    name: 'Forest Road 1',
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
    important: true,
    type: 'pub'
  },
  {
    id: 'forestRoad2',
    name: 'Forest Road 2',
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
    important: true
  },
  {
    id: 'borum',
    name: 'Borum',
    type: 'plaza',
    important: true
  },
];