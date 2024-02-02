const axios = require('axios');
require('dotenv').config();

const postRegister = async (body) => {
  const result = await axios.post(process.env.url + '/register', {
    firstName: body.firstName,
    lastName: body.lastName,
    address: body.address,
    city: body.city,
    state: body.state,
    zipCode: body.zipCode,
    email: body.email,
    password: body.password,
  });
  console.log(result)
  return result;
};

module.exports={postRegister};