import useUpdate from 'hooks/ipcs/update'
import { useState, useEffect } from 'react'

import '../styles/update.css'

export default function Update() {
  const { updateCreate, updateDestroy } = useUpdate()
  const [log, setLog] = useState('업데이트 확인중입니다...')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    updateCreate(setLog, setProgress)
    return () => {
      updateDestroy()
    }
  }, [updateCreate, updateDestroy])
  return (
    <div className="update">
      <img
        src={require('assets/image/login.png')}
        style={{ flex: 1, width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }}
        alt="login-image"
      />
      <div
        style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.85)', width: '100%', height: '100%', position: 'absolute' }}
      />
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <div style={{ color: 'white', fontSize: 22 }}>
          <p dangerouslySetInnerHTML={{ __html: log }}></p>
        </div>
        <div className="progress">
          <progress max="10000" value={progress * 10000}></progress>
        </div>
      </div>
    </div>
  )
}
