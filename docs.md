# CRYPTO TRACKER


## 환경설정
1. styled-components 설치
```bash
npm i styled-components
npm i --save-dev @types/styled-components 
```

2. react-router-dom, react-query 설치
```bash
npm i react-router-dom react-query
npm i --save-dev @types/react-router-dom # React Router 6버전으로 진행시 @types/react-router-dom를 설치하지 않아도 됨
```

<br><br>

## Docs

### 1. nested router / nested route
route안에 있는 또 다른 route
웹사이트의 탭을 사용할 때 / 스크린 안에 많은 섹션이 나뉘어진 곳에 이용

- 구현 방법 1
Routers.tsx
```javascript
<Route path="/:coinId/*" element={<Coin/>} />
```
Coin.tsx
```javascript
<Routes>
<Route path="chart" element={<Chart />} />
<Route path="price" element={<Price />} />
</ Routes>
```

- 구현방법 2
Routers.tsx
```javascript
<Route path="/:coinId" element={<Coin />} >
    <Route path="chart" element={<Chart />} />
    <Route path="price" element={<Price />} />
</Route>
```
Coin.tsx
```javascript
...
 </Overview>
<Outlet/> // 추가
</>
```

<br><br>

### 2. react query
>React 애플리케이션에서 서버 state를 fetching, caching, synchronizing, updating할 수 있도록 도와주는 라이브러리<br>
>"global state"를 건드리지 않고 React 및 React Native 애플리케이션에서 데이터를 가져오고, 캐시하고, 업데이트합니다.

- 설치
```
npm i react-query
```

- 캐시데이터 확인하기
```javascript
import { ReactQueryDevtools } from 'react-query/devtools';

...
      <ReactQueryDevtools initialIsOpen={true} />
...
```
<br><br>

### 3. APEXCHARTS.JS
chart를 그려주는 라이브러리
```bash
npm install --save react-apexcharts apexcharts
```
<br><br>

### 4. react-helmet
render한 컴포넌트가 head로 감

```
npm i react-helmet
npm i --save-dev @types/react-helmet
```
<br>

```Warning: Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code.```에러날 시 
```
npm i react-helmet-async
```
```javascript
<HelmetProvider>
<Helmet>
</Helmet>
</HelmetProvider>
```
<br><br>

### 6. state management 
- Recoil, Redux 등
- 단순 reactJS로 상태관리를 할때 생기는 불편함을 해결하기 위해 사용
    - reactJS로 할 경우 : App에서 컴포넌트로 내려가는 계층구조로 인해서 state와 state manipulation을 일일이 각 component들에 전달해줘야함. (App-Router-Coins // App-Router-Coin-Chart)
    - State management로 할 경우 : state를 따로 buble에 담아서 각 컴포넌트들이 필요할때 buble에 접속해서 사용할 수 있게 함. (App -> (isDark)

**Recoil**
```
npm install recoil
```