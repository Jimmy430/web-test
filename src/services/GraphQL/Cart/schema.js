import gql from "graphql-tag";

export const COMPLETE_CHECKOUT = gql`
mutation($address:AddressInput!, $checkorderInput:DraftOrderInput!, $type: OrderType, $customTime: Int){
	checkAndCreateDraftOrder(address:$address, checkOrderInput:$checkorderInput, type:$type, customTime:$customTime){
		error
		draftOrderId
		stripeCustomerId
		ephemeralKey
		paymentIntentId
		paymentIntentClientSecret
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
		usedCredit
	}
}
`

export const RETRIEVE_ORDER = gql`
mutation($draftOrderId: ID!){
	retrieveOrderByDraftOrderId(draftOrderId: $draftOrderId){
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
		usedCredit
	}
}
`

export const GET_MEALBOX_DELIVERY_STATUS = gql`
query($customerId:ID!, $shippingAddressId:Int!, $mealtimeId:Int!){
	deliveryNew(customerId:$customerId, shippingAddressId:$shippingAddressId, mealtimeId:$mealtimeId){
		productId
		title
		variantId
		variantTitle
		variantLabel
		quantity
		vendor
		sequence
		status
		startTime
		endTime
		newStartTime
		newEndTime
		delayOffset
		eta
		delivered_date
		shippingAddress
		lastUpdated
	}
}
`

export const GET_MINIBUFFET_DELIVERY_STATUS = gql`
query($customerId:ID!, $shippingAddressId:Int!, $mealtimeId:Int!, $servingDate: String){
	miniBuffetDelivery(customerId:$customerId, shippingAddressId:$shippingAddressId, mealtimeId:$mealtimeId, servingDate: $servingDate){
		productId
		title
		variantId
		variantTitle
		quantity
		vendor
		options	{
			productId
			title
      		variantId
			variantTitle
			quantity
			vendor
			vendorImage
			sequence
		}
		status
		startTime
		endTime
		newStartTime
		newEndTime
		delayOffset
		eta
		delivered_date
		shippingAddress
		lastUpdated
	}
}
`

export const CANCEL_LINEITEM = gql`
mutation ($refundInput:RefundInput!){
	refundLineItem(input:$refundInput){
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
			}
			isDelivered
			isRefunded
		}
	}
}
`

export const REFUND_LINEITEM_BY_STRIPE = gql`
mutation ($refundInput: RefundInput!){
	refundLineItemByStripe(input: $refundInput){
		error
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
				title
				dishType
				estimatedMin
				estimatedMax
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
			}
			isDelivered
			isRefunded
		}
	}
}
`

export const COMPLETE_DRAFTORDER_BY_STRIPE = gql`
mutation($draftOrderId: ID!, $paymentIntentId: String!){
	completeDraftOrderByStripe(draftOrderId: $draftOrderId, paymentIntentId: $paymentIntentId){
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
				title
				dishType
				estimatedMin
				estimatedMax
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
		usedCredit
	}
}
`

export const REFUND_MINIBUFFET_BY_STRIPE = gql`
mutation ($setLineitemId: ID!, $isLastDrop: Boolean){
	refundMiniBuffetByStripe(setLineitemId: $setLineitemId, isLastDrop: $isLastDrop){
		error
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
				title
				dishType
				estimatedMin
				estimatedMax
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
			}
			isDelivered
			isRefunded
		}
	}
}
`