import dayjs from 'dayjs'
import React, { SetStateAction } from 'react'
import styled from 'styled-components'

const buttonText = [
  { label: '오늘', value: 'TODAY' },
  { label: '1주', value: 'WEEK' },
  { label: '1개월', value: 'MONTH' },
]

interface HistoryDateFilterProps {
  date: string
  setDate: React.Dispatch<SetStateAction<string>>
  filter: string
  setFilter: React.Dispatch<SetStateAction<string>>
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
      <DateInput type="date" value={dayjs().format('YYYY-MM-DD')} defaultValue={dayjs().format('YYYY-MM-DD')} />
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
const DateInput = styled.input`
  border-radius: 8px;
  padding: 12px 16px;
  border: 2px solid #c6c6c6;
`
