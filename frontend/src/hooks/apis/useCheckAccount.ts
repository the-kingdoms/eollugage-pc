import { useQuery } from '@tanstack/react-query'
import { getMy } from 'apis/my'
import { ROUTE } from 'constants/path'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { storeIdAtom } from 'utils/atom'

function useCheckLogin() {
  const navigate = useNavigate()
  const [, setStoreId] = useAtom(storeIdAtom)
  const query = useQuery({
    queryKey: ['getMy'],
    queryFn: () => getMy(),
  })

  useEffect(() => {
    if (query.isSuccess) {
      if (query.data.storeList.length === 0) return

      setStoreId(query.data.storeList[0].storeId)
      navigate(ROUTE.WAITING_MAIN)
    }
    // eslint-disable-next-line
  }, [query.isSuccess])

  return query
}

export { useCheckLogin }
