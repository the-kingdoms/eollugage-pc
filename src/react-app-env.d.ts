/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string
    REACT_APP_KAKAO_REST_KEY: string
    REACT_APP_KAKAO_JS_KEY: string
  }
}
