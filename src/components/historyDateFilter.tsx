import dayjs from 'dayjs'
import React, { SetStateAction, useState } from 'react'
import styled from 'styled-components'

const buttonText = ['오늘', '1주', '1개월']

interface HistoryDateFilterProps {
  date: string
  setDate: React.Dispatch<SetStateAction<string>>
}

export default function HistoryDateFilter({ date, setDate }: HistoryDateFilterProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0)

  const onClickDate = (index: number) => {
    setSelectedIdx(index)
    switch (index) {
      case 0:
        setDate(dayjs().format('YYYY.MM.DD'))
        break
      case 1:
        setDate(dayjs().subtract(1, 'week').format('YYYY.MM.DD') + ' - ' + dayjs().format('YYYY.MM.DD'))
        break
      case 2:
        setDate(dayjs().subtract(1, 'month').format('YYYY.MM.DD') + ' - ' + dayjs().format('YYYY.MM.DD'))
        break
      default:
        setDate('error')
    }
  }

  return (
    <Container>
      {buttonText.map((text, i) => (
        <DateButton selected={i === selectedIdx} onClick={() => onClickDate(i)}>
          {text}
        </DateButton>
      ))}
      <DateInput type="date" value={dayjs(date).format('YYYY-MM-DD')} defaultValue={dayjs(date).format('YYYY-MM-DD')} />
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
