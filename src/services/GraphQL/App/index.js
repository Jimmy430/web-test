import { client } from "../Client"
import { REQUEST_PROPOSAL } from './schema'
import { formatData } from "../utils"
import ErrorTrackingAPI from '../../ErrorTrackingAPI'

export default class AppAPI {
    static requestProposal = ({ name, phone, email, servingDate, mealtimeID, guests }) => {
        try {
            return client.mutate({
                mutation: REQUEST_PROPOSAL,
                variables: {
                    input: { name, phone, email, servingDate, mealtimeID, guests }
                }
            }).then(res => {
                const modal = formatData(res, 'requestProposal')
                return modal
            }).catch(error => {
                ErrorTrackingAPI.sendError(error, "AppAPI", "requestProposal", "GraphQLError")
                return { error }
            })
        } catch (error) {
            ErrorTrackingAPI.sendError(error, "AppAPI", "requestProposal", "SystemError")
            return { error }
        }
    }
}