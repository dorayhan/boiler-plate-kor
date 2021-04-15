const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser');
const { User } = require("./models/User");

const config = require('./config/key');

// body parser에 옵션을 준다. 
// body parser는 서버에서 오는 정보들을 분석해서 가져와주는 역할을 한다.

//얘는 application/x-www-form-urlencoded라는 애를 가져와주는 거고
app.use(bodyParser.urlencoded({extended: true}));
// application/json으로 되어있는 애들을 분석해서 가져와주기 위해
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Doray 야!!! 이거 공부하려면 한 세월걸리겠구나')
})

app.post('/register', (req, res) => {

    //회원가입할 때 필요한 정보들을 client에서 가져오면,
    //그것들을 db에 넣어준다. 

    const user = new User(req.body)
      
    user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err})
      return res.status(200).json({
        success: true
      })
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

