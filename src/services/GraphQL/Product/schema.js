import gql from 'graphql-tag'

export const GET_MENU_BY_GROUP_IDS = gql`
query($groupIds: [Int]!, $isFree: Boolean, $isDev: Boolean){
  menu(groupIds: $groupIds, isFree: $isFree, isDev: $isDev) {
    id
    title
    description
    image
    images
    tags
    labels
    vendor {
      id
      name
      location
    }
    productType
    servingDate
    servingTime {
      menugroupId
      mealtime{
        id
        sequence
      }
      time
    }
    cutoffTimeV2 {
      first
      second
    }
    inventory
    sequence
    orderedPax
    dishReview{
      isNew
      total
      visible
    }
    options {
      name
      values
    }
    variants {
      id
      title
      price {
        amount
      }
    }
  }
}
`

export const GET_MINI_BUFFET_DATES = gql`
query($groupIds: [Int]!){
  menuMiniBuffetDates(groupIds:$groupIds){
    menugroupId
    mealtimeId
    servingDate
    minPrice
    isSoldOut
  }
}
`

export const GET_MINI_BUFFET_MENU_BY_CONDITION = gql`
query($groupIds: [Int]!, $servingDate: String!, $mealtimeId: Int!, $maxPax:Int){
  menuMiniBuffet(groupIds: $groupIds, servingDate: $servingDate, mealtimeId: $mealtimeId, maxPax: $maxPax){
    id
    variantId
    title
    variantTitle
    image
    images
    price {
      amount
      currency
    }
    servingDate
    options {
      id
      title
      description
      image
      images
      tags
      labels
      vendor{
        id
        name
        location
      }
      variants {
        id
        title
      }
      reviewAvg
      sequence
      packs
      dishReview {
        isNew
        total
        visible
      }
    }
    servingTime{
      mealtime{
        id
        name
        sequence
      }
      menugroupId
      time
      start
      end
    }
    cutoffTimeV2{
      first
      second
    }
    inventory
    estimatedMin
    estimatedMax
    orderedPax
    sequence
  }
}
`

export const GET_SPECIFIC_DELIVERY_TIMES = gql`
{
  retrieveSpecificDeliveryTimes{
    id
    mealtimeId
    minutes
    exceptions
  }
}
`