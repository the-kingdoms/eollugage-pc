import dayjs from 'dayjs'
import React, { SetStateAction } from 'react'
import styled from 'styled-components'

const buttonText = [
  { label: '오늘', value: 'TODAY' },
  { label: '1주', value: 'WEEK' },
  { label: '1개월', value: 'MONTH' },
  { label: '전체', value: 'ALL' },
]

interface HistoryDateFilterProps {
  date: string
  setDate: React.Dispatch<SetStateAction<string>>
  filter: 'TODAY' | 'WEEK' | 'MONTH' | 'ALL'
  setFilter: React.Dispatch<SetStateAction<'TODAY' | 'WEEK' | 'MONTH' | 'ALL'>>
}

export default function HistoryDateFilter({ date, setDate, filter, setFilter }: HistoryDateFilterProps) {
  const onClickDate = (value: string) => {
    switch (value) {
      case 'TODAY':
        setDate(dayjs().format('YYYY.MM.DD'))
        setFilter('TODAY')
        break
      case 'WEEK':
        setDate(dayjs().subtract(1, 'week').format('YYYY.MM.DD') + ' - ' + dayjs().format('YYYY.MM.DD'))
        setFilter('WEEK')
        break
      case 'MONTH':
        setDate(dayjs().subtract(1, 'month').format('YYYY.MM.DD') + ' - ' + dayjs().format('YYYY.MM.DD'))
        setFilter('MONTH')
        break
      case 'ALL':
        setDate('전체')
        setFilter('ALL')
        break
      default:
        setDate('error')
        setFilter('ALL')
    }
  }

  return (
    <Container>
      {buttonText.map((button, i) => (
        <DateButton selected={button.value === filter} onClick={() => onClickDate(button.value)}>
          {button.label}
        </DateButton>
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 45px;
`
const DateButton = styled.div<{ selected: boolean }>`
  background-color: ${props => (props.selected ? '#000000' : 'transparent')};
  color: ${props => (props.selected ? '#FFFFFF' : '#000000')};
  border-radius: 1000px;
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
`
