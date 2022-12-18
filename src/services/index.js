import AppAPI from './GraphQL/App'
import CustomerAPI from './GraphQL/Customer'
import ProductAPI from './GraphQL/Product'
import CartAPI from './GraphQL/Cart'
import AmplitudeAPI, { Events } from './AmplitudeAPI'
import ErrorTrackingAPI from './ErrorTrackingAPI'
// import { StripeProvider, stripeTestMode } from './Stripe'

export {
    AppAPI,
    CustomerAPI,
    ProductAPI,
    CartAPI,
    AmplitudeAPI,
    Events,
    ErrorTrackingAPI,
    // StripeProvider,
    // stripeTestMode
}