import api from './network'

type RoleType = 'OWNER' | 'MANAGER' | 'STAFF'
type DayType = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

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
  member: AbstractMember
  planList: Plan[]
  role: RoleType
  position: string
}

interface Plan {
  id: string
  relationId: string
  day: DayType
  startTime: string
  endTime: string
  restStartTime: string
  restEndTime: string
}

interface Store {
  storeId: string
  name: string
}

async function getMy(): Promise<My> {
  const { data } = await api.get<My>(`/api/my`)
  return data
}

export { getMy }
export type { My }
