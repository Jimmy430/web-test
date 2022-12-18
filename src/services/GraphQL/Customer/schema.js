import gql from 'graphql-tag'

export const CHECK_MENU_GROUP = gql`
query($postcode: String!){
  customerCheckMenuGroup(postcode: $postcode){
    error
    address{
      postcode
      address
      building
      block
      floor
      unit
      deliveryFee{
        tier
        fee
      }
      menuGroups{
        id
        name
      }
    }
  }
}
`

export const REQUEST_POSTCODE = gql`
mutation($requestPostcodeInput: RequestPostcodeInput!){
  customerRequestPostcode(input: $requestPostcodeInput){
    success
    error
  }
}
`

export const CREATE_ACCOUNT = gql`
mutation($customerInput: CreateCustomerInput!, $addressInput: AddressInput!){
  customerCreate(customerInput: $customerInput, addressInput: $addressInput){
    error
    accessToken{
      accessToken
      expiresAt
    }
  }
}
`

export const RECEIVE_ACCESS_TOKEN = gql`
query($email: String!, $password: String!) {
  customerGetToken(email: $email, password: $password) {
    error
    accessToken {
      accessToken
      expiresAt
    }
  }
}
`

export const RENEW_ACCESS_TOKEN = gql`
mutation($accessToken: String!){
  customerRenewToken(accessToken: $accessToken){
    error
    accessToken{
      accessToken
      expiresAt
    }
  }
}
`

export const RECOVER_ACCOUNT = gql`
mutation($email: String!) {
  customerRecover(email: $email){
    error
  }
}
`

export const GET_CUSTOMER_INFO = gql`
query($accessToken: String!, $notificationToken: String) {
  customer(accessToken: $accessToken, notificationToken: $notificationToken) {
    id
    email
    firstName
    lastName
    phone
    tags
    addresses{
      id
      postcode
      block
      address
      building
      floor
      unit
      isNoUnit
      navigationInstruction
      opNotes
      deliveryFee{
        tier
        fee
      }
      menuGroups{
        id
        name
        canLateOrder
      }
    }
    tier
    referralCode
    credit {
      usableV2{
        unrestricted
        minibuffet
      }
      lines {
        amount
        currentAmount
        date
        expiredDate
        action
        type
        note
        applicability
      }
    }
    showStoreReview
    orders {
      id
      number
      note
      isCancelled
      lineitems {
        id
        setVariantId
        quantity
        credit
        variant {
          id
          title
          price {
            amount
            currency
          }
        }
        product {
          id
          dishType
          estimatedMin
          estimatedMax
          title
          description
          image
          images
          tags
          servingDate
          servingTime{
            mealtime{
              id
              sequence
            }
            time
            start
            end
            menugroupId
          }
          cutoffTimeV2 {
            first
            second
          }
          vendor{
            name
            location
          }
        }
        isDelivered
        isRefunded
      }
      shippingAddress {
        id
        postcode
        block
        address
        floor
        unit
        navigationInstruction
      }
    }
    customDeliveryTimes {
      shippingAddressId
      servingDate
      menuGroupId
      customTime
    }
    reviews {
      id
      title
      comment
      rating
      product {
        id
        title
      }
    }
  }
}
`

export const GET_CUSTOMER_INFO_BY_ID = gql`
query($id: ID!) {
  customerById(id: $id) {
    id
    email
    firstName
    lastName
    phone
    tags
    addresses{
      id
      postcode
      block
      address
      building
      floor
      unit
      isNoUnit
      navigationInstruction
      opNotes
      deliveryFee{
        tier
        fee
      }
      menuGroups{
        id
        name
      }
    }
    tier
    referralCode
    credit {
      usableV2{
        unrestricted
        minibuffet
      }
      lines {
        amount
        currentAmount
        date
        expiredDate
        action
        type
        note
        applicability
      }
    }
    showStoreReview
    orders {
      id
      number
      note
      isCancelled
      lineitems {
        id
        setVariantId
        quantity
        credit
        variant {
          id
          title
          price {
            amount
            currency
          }
        }
        product {
          id
          dishType
          estimatedMin
          estimatedMax
          title
          description
          image
          images
          tags
          servingDate
          servingTime{
            mealtime{
              id
              sequence
            }
            time
            start
            end
            menugroupId
          }
          cutoffTimeV2 {
            first
            second
          }
          vendor{
            name
            location
          }
        }
        isDelivered
        isRefunded
      }
      shippingAddress {
        id
        postcode
        block
        address
        floor
        unit
        navigationInstruction
      }
    }
    reviews {
      id
      title
      comment
      rating
      product {
        id
        title
      }
    }
  }
}
`

export const GET_CURRENT_CREDIT = gql`
query($accessToken: String!) {
  customer(accessToken: $accessToken) {
    credit {
      usableV2{
        unrestricted
        minibuffet
      }
      lines {
        amount
        currentAmount
        date
        expiredDate
        action
        type
        note
        applicability
      }
    }
  }
}
`

export const CHECK_PROMO_CODE = gql`
query($promoCode: String!, $customerId: ID!, $orderAmount: Float!, $postcode: String!, $orderType: String!){
  checkPromoCode(code:$promoCode, customerId:$customerId, orderAmount:$orderAmount, postcode:$postcode, orderType:$orderType){
    error
    promoCode{
      code
      name
      type
      value
      applicability
    }
  }
}
`

export const GET_CURRENT_CUSTOM_DELIVERY_TIMES = gql`
query($accessToken: String!) {
  customer(accessToken: $accessToken) {
    customDeliveryTimes {
      shippingAddressId
      servingDate
      menuGroupId
      customTime
    }
  }
}
`

export const UPDATE_CUSTOMER_INFO = gql`
mutation($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
  customerInfoUpdate(accessToken:$customerAccessToken, customer:$customer){
    error
    customer{
      firstName
      lastName
      phone
    }
  }
}
`

export const CUSTOMER_ADD_ADDRESS = gql`
mutation($customerId:Long!, $address: AddressInput!){
  customerAddAddress(customerId:$customerId, address:$address){
    error
    addresses{
      id
      postcode
      block
      address
      building
      floor
      unit
      isNoUnit
      navigationInstruction
      opNotes
      deliveryFee{
        tier
        fee
      }
      menuGroups{
        id
        name
      }
    }
  }
}
`

export const CUSTOMER_UPDATE_ADDRESS = gql`
mutation($addressId: Int!, $address: AddressInput!){
  customerUpdateAddress(addressId: $addressId, address: $address){
    error
    addresses{
      id
      postcode
      block
      address
      building
      floor
      unit
      isNoUnit
      navigationInstruction
      opNotes
      deliveryFee{
        tier
        fee
      }
      menuGroups{
        id
        name
      }
    }
  }
}
`

export const CUSTOMER_DELETE_ADDRESS = gql`
mutation($addressId: Int!){
  customerDeleteAddress(addressId: $addressId){
    error
    addresses{
      id
      postcode
      block
      address
      building
      floor
      unit
      isNoUnit
      navigationInstruction
      opNotes
      deliveryFee{
        tier
        fee
      }
      menuGroups{
        id
        name
      }
    }
  }
}
`

export const GET_CUSTOMER_REVIEWS = gql`
query($customerId: Long!){
  customer(id: $customerId){
    reviews{
      title
      rating
      comment
      product{
        id
      }
    }
  }
}
`

export const POST_MULTIPLE_REVIEW = gql`
mutation($reviewInputs:[ReviewInput]){
  postReviews(reviewInputs: $reviewInputs){
    id
    title
    comment
    rating
    product {
      id
      title
    }
  }
}
`

export const POST_FEEDBACK = gql`
mutation($input: [FeedbackInput]){
  customerFeedback(input: $input){
    area
    comment
    comment_datetime
  }
}
`

export const RECEIVE_NOTIFICATION = gql`
mutation($messageId: Int){
  notificationReceived(messageId: $messageId){
    id
    message
    type
    sent
    received
    clicked
  }
}
`

export const CLICK_NOTIFICATION = gql`
mutation($messageId: Int){
  notificationClicked(messageId: $messageId){
    id
    message
    type
    sent
    received
    clicked
  }
}
`

export const GET_NOTIFICATIONS_BY_CUSTOMER_ID = gql`
query($customerId: Long!){
  retrieveNotifications(customerId: $customerId){
    id
    title
    message
    type
    sent
    received
    clicked
    scheduledDate
  }
}
`

export const CUSTOMER_SEE_STORE_REVIEW = gql`
mutation($customerId: Long, $isRated: Boolean){
  customerSeeStoreReview(customerId: $customerId, isRated: $isRated){
    error
  }
}
`