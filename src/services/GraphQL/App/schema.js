import { gql } from 'graphql-tag'

export const RETRIEVE_ANNOUNCEMENT = gql`
{
    annoucement{
        target
        body
        innerTitle
        innerBody
        innerBackgroundImage
        shareContent
        textColor
    }
}
`

export const RETRIEVE_TERM_AND_CONDITIONS = gql`
{
    retrieveTermAndConditions
}
`

export const REQUEST_PROPOSAL = gql`
mutation($input: MinibuffetRequestInput!){
    requestProposal(input: $input){
        success
        error
    }
}
`