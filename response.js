const response = [
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 43.4496387,
        lng: -80.5016019,
      },
      viewport: {
        northeast: {
          lat: 43.45092778029151,
          lng: -80.50010381970849,
        },
        southwest: {
          lat: 43.44822981970851,
          lng: -80.50280178029149,
        },
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    icon_background_color: '#7B9EB0',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
    name: 'KPMG',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 1314,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104962571987928092492">KPMG</a>',
        ],
        photo_reference:
          'AeeoHcJYYYzJil5kZdtCK9COeL2UKpW0DwkcV9JtS3C4o1x-meHHFQhKZGBTteROJkEhKSboD_Nck1ZTa4NBYqbsH2pgPHpomlFYMMgUGnCzRal2eehI5dM2sJ1Hq-O1D4CHwVQo6mgEgRBqEY8le5ZTxJQqD1ConGMWabEEYqBKiNrtpESfJaXwvhIfr5ApYfR1HLU_tVKuqCK6Y07E7tGPmf9WTOYjuxRxRhaEfKjRVbiUUp9EMT5We3xH9vN8nH-8ytmyZuXtoUPqhZGRn3M8vC8hzhC2cKq7L0kgMAhLVauCMNLnh6QyWuzsq-xQp0DQ-1gP3uqJ',
        width: 1688,
      },
    ],
    place_id: 'ChIJg34IKhP0K4gRpgCMnvGfaOs',
    plus_code: {
      compound_code: 'CFXX+V9 Kitchener, ON, Canada',
      global_code: '86MXCFXX+V9',
    },
    rating: 3.5,
    reference: 'ChIJg34IKhP0K4gRpgCMnvGfaOs',
    scope: 'GOOGLE',
    types: ['accounting', 'finance', 'point_of_interest', 'establishment'],
    user_ratings_total: 6,
    vicinity: '120 Victoria Street South Suite 600, Kitchener',
  },
];

export const getSimpleData = (response) => {
  if (!response || !Array.isArray(response)) {
    console.error('Invalid response format');
    return [];
  }
  const places = response.map((feature) => {
    const { name, full_address, geometry } = feature;
    return {
      name,
      address: full_address,
      coordinates: geometry.location,
      longitude: geometry.location.lng,
      latitude: geometry.location.lat,
      types: feature.types,
    };
  });
  return places;
};
// const simpleData = getSimpleData(response);
