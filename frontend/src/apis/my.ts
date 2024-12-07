import api from './network'

type RoleType = 'OWNER' | 'MANAGER' | 'STAFF'

interface AbstractMember {
  id: string | null
  name: string | null
  phone: string | null
  providerType: 'KAKAO' | null
  storeList: Store[]
}

interface My extends AbstractMember {
  relationList: Relation[]
}

interface Relation {
  id: string
  storeId: string
  role: RoleType
  position: string
}

interface Store {
  storeId: string
  name: string
}

async function getMy(): Promise<My> {
  const { data } = await api.get<My>(`/api/v1/my`)
  return data
}

export { getMy }
export type { My }
