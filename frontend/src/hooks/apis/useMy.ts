import { useQuery } from '@tanstack/react-query'
import { getMy } from 'apis/my'
import { ROUTE } from 'constants/path'
import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { storeIdAtom } from 'utils/atom'

function useGetMy(type: 'click' | 'auto') {
  const navigate = useNavigate()
  const [, setStoreId] = useAtom(storeIdAtom)
  const query = useQuery({
    queryKey: ['getMy', type],
    queryFn: () => getMy(),
    enabled: false,
  })

  useEffect(() => {
    if (query.isSuccess) {
      if (query.data.storeList.length === 0) {
        if (type === 'click') {
          alert('등록된 가게가 없습니다')
          navigate(ROUTE.LOGIN)
        }
        return
      }
      setStoreId(query.data.storeList[0].storeId)
      navigate(ROUTE.WAITING_MAIN)
    }

    // eslint-disable-next-line
  }, [query.isSuccess])

  useEffect(() => {
    if (query.isError && type === 'click') {
      alert('다시 로그인해주세요')
      navigate(ROUTE.LOGIN)
    }
  }, [query.isError, type, navigate])

  return query
}

export { useGetMy }
