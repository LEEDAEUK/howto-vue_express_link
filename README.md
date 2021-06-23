
# Frontend 설정

### vue cli 설치

- vue cli 3.x 설치 | `npm i -g @vue/cli`
- 혹시 vue cli 3.x를 사용하여 vue cli 2 템플릿을 사용하고자 한다면 `npm i -g @vue/cli-init`

### 프로젝트 생성 (설정은 본인에게 맞는 설정으로 진행)

- `vue create <project-name>` (vue create frontend) → 폴더명은 frontend로 하는게 보기 편하다

    → menually

    → need item : babel, router, vuex

    →원하는 뷰 버전 (필자는 2.x으로 진행한다)

    → history mode → yes

    → lint standard

    → lint on save

    → in dedicated config files

    → preset? y or n

### vuetify 설치

- `cd frontend`
- `vue add vuetify`

    → still proceed? yes

---

# Backend 설정

### express 설치

- `npm install express-generator -g`

### 프로젝트 생성

- `express --view=pug backend`
- `cd backend`
- `npm install`
- `npm install nodemon express cors`
- `npm i connect-history-api-fallback`

### 설치한 cors 설정

backend → app.js

```jsx
const cors = require('cors');

const app = express(); //app 선언하는곳 아래에 

app.use(cors()); //작성해주자
app.use(require('connect-history-api-fallback')());
```

### 노드몬 설정

backend → package.json → script부분 수정

```jsx
"scripts": {
  "start": "nodemon ./bin/www"
},
```

---

# Backend 설정 후 Frontend에 axios 설치, 적용

- `cd frontend`
- `npm install axios` : axios 설치
- `cd src`
- `mkdir api` : api 폴더 생성
- `cd api`
- `touch api.js` : api.js 파일 생성

frontend → api → api.js

```jsx
import axios from 'axios'

export default axios.create({
  baseURL: `http://localhost:3000/`
});
```

frontend → src → main.js

```jsx
import API from './api/api'

Vue.prototype.$http = API
```

html에서 오른쪽 스크롤바를 없애는 법

index.html

```jsx
<style>
overflow-y: auto !important
</style>
```

Home.vue 에서 사용법

```jsx
<template>
  <v-container fill-height grid-list-xs>
    <v-layout column>
      <v-flex class="d-flex flex-column align-center justify-center">
        <div>
          <v-btn @click="getUser">click</v-btn>
        </div>
        <div>
          {{ user_info.user_name }}
        </div>
        <div>
          {{ user_info.user_age }}
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created() {
    this.$emit("Title", "ホーム");
  },
  data() {
    return {
      user_id: 1,
      user_info: { user_name: null, user_age: null },
    };
  },
  methods: {
    getUser() {
      this.$http.get(`/api/home/${this.user_id}`).then((response) => {
        if (response.data.message == "good") {
          this.user_info = response.data.result[0];
        } else {
        }
      });
    },
  },
};
</script>

<style scope>
</style>
```

frontend → router → index.js

```jsx
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

backend → routes →home.js

```jsx
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:user_id', function (req, res, next) {
  res.send({
    result: [{ user_name: "lee", user_age: 27 }],
    message: "good"
  })
});

module.exports = router;
```

backend → app.js

```jsx
var homeRouter = require('./routes/home');

app.use('/api/home/', homeRouter);
```

---

# Frontend와 Backend의 연동

- path패키지 설치 | `npm install path`
- vue.config.js 파일이 없다면 생성해야한다 outputDir는 프론트엔드에서 빌드했을 때 백엔드로 파일생성을 하게 해 준다

    frontend → vue.config.js

    ```jsx
    var path = require("path")

    module.exports = {
      transpileDependencies: [
        'vuetify'
      ],
      outputDir: path.resolve(__dirname, "../backend/public"),
      devServer: {
        historyApiFallback: true,
        clientLogLevel: 'info',
        proxy: { // proxyTable 설정 
          '/api': {
            target: 'http://localhost:3000/api',
            changeOrigin: true,
            pathRewrite: {
              "^/api": ''
            }
          }
        }
      }
    }
    ```

    여기서 경로에 프록시 api가 붙었으므로, backend → app.js에서 경로 설정해줄때도 api/blabla로 설정해야 한다

    예시

    backend → app.js

    ```jsx

    ...

    var loginRouter = require('./routes/login');

    var app = express();

    app.use('/api/login', loginRouter);

    ...
    ```

    tedious는 이 버전 사용하자

    `npm i tedious@9.2.1`

    ```jsx

    "tedious": "^9.2.1"
    ```
