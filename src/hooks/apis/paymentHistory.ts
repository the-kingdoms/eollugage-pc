import { useQuery } from '@tanstack/react-query'
import { getPaymentHistory } from 'apis/paymentHistory'
import { useAtom } from 'jotai'
import { storeIdAtom } from 'utils/atom'

function useGetPaymentHistory() {
  const [storeId] = useAtom(storeIdAtom)

  const { data } = useQuery({
    queryKey: ['getPaymentHistory'],
    queryFn: () => getPaymentHistory(storeId),
  })
  return { data }
}

export { useGetPaymentHistory }
