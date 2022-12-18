import { useRef, useEffect, useState } from "react"

import { gql, useQuery } from "@apollo/client"

export const useOnUpdate = (effect, dependencies = []) => {
    const isInitailMount = useRef(true)

    useEffect(() => {
        if (isInitailMount.current) {
            isInitailMount.current = false
        } else {
            return effect()
        }
    }, dependencies)
}

const GET_FREE_SAMPLE_BANNED_CUSTOMERS = gql`
{
  retrieveFreeSampleBannedCustomers{
    id
    isBanned
  }
}
`

export const useShowFreeSamples = (customerID, tier) => {
    const [shouldShow, isShouldShow] = useState(false)
    const { data } = useQuery(GET_FREE_SAMPLE_BANNED_CUSTOMERS, {
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-first'
    })

    useEffect(() => {
        if (!!data) {
            const freeMealsBannedList = data.retrieveFreeSampleBannedCustomers

            const canSeeFreeSamples = !freeMealsBannedList.some(bannedCustomer => bannedCustomer.id === customerID && bannedCustomer.isBanned) && tier >= 2
            isShouldShow(canSeeFreeSamples)
        }
    }, [data])

    return shouldShow
}