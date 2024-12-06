import { usePhoneLogin } from 'hooks/apis/useLogin'
import { useState } from 'react'
import styled from 'styled-components'

export default function PhoneLogin() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [uid, setUid] = useState('')
  const [isGetAuthNumber, setIsGetAuthNumber] = useState(false)

  const { sendVerifcationCodeMutate, loginMutate } = usePhoneLogin()
  const onClickGetAuthNumber = () => {
    sendVerifcationCodeMutate(
      {
        data: {
          name,
          phone,
        },
      },
      {
        onSuccess: res => {
          setUid(res.id)
          setIsGetAuthNumber(true)
        },
      },
    )
  }
  const onClickLogin = () => {
    loginMutate({
      data: {
        uid,
        verificationCode,
      },
    })
  }
  return (
    <Container>
      <InputContainer>
        <TextField placeholder="사장님 이름을 입력해주세요" value={name} onChange={e => setName(e.target.value)} />
        <TextField
          placeholder="휴대폰 번호를 입력해주세요(-제외)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
        {isGetAuthNumber && (
          <TextField
            placeholder="인증번호를 입력해주세요"
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value)}
          />
        )}
      </InputContainer>
      {isGetAuthNumber ? (
        <>
          <UpdateAuthNumberText onClick={onClickGetAuthNumber}>인증번호 다시 받기</UpdateAuthNumberText>
          <PhoneLoginButton onClick={onClickLogin} disabled={!verificationCode}>
            인증하기
          </PhoneLoginButton>
        </>
      ) : (
        <PhoneLoginButton onClick={onClickGetAuthNumber} disabled={!name || !phone}>
          인증번호 받기
        </PhoneLoginButton>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`

const TextField = styled.input`
  width: 100%;
  height: 56px;
  border: 1px solid #c6c6c6;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 0 16px;
  &:focus {
    outline: none;
    border: 1px solid #8d8d8d;
  }
`

const PhoneLoginButton = styled.button`
  background-color: #131313;
  color: #ffffff;
  width: 328px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  height: 64px;
  border: none;
  &:disabled {
    background-color: #c6c6c6;
    color: #8d8d8d;
    cursor: not-allowed;
  }
`

const UpdateAuthNumberText = styled.div`
  font-size: 12px;
  color: #131313;
  cursor: pointer;
  text-align: center;
  text-decoration: underline;
`
