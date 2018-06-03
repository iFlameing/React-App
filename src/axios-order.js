import axios from 'axios'

 const instances= axios.create({
    baseURL:'https://my-first-react-app-84542.firebaseio.com/'
})

export default instances;