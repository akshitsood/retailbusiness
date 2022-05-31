import React,{useEffect} from 'react'
import { Button, Input,Form,Row,Col,message } from 'antd'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import "../resources/authentication.css"

function Register() {

  const dispatch=useDispatch()
  const navigate=useNavigate()
    const onFinish=(values)=>
    {
      dispatch({type:'showLoading'})
       axios.post('/api/users/register',values).then((res)=>
         {
          dispatch({type:'hideLoading'})
           message.success('Registration Successful, please wait for the verification')
         }).catch(() => {
          dispatch({type:'hideLoading'})
           message.error('Something went wrong')
         })
    }
    useEffect(() => {
      if( localStorage.getItem('pos-user'))
       navigate('/home')
     }, [])
  return (
   <div className="authentication">
    <Row className=''>
        <Col lg={8} xs={22}>
        <Form layout="vertical" onFinish={onFinish}>
        <h1><b>POS</b></h1>
        <h3>Register</h3>
        <h3/>
            <Form.Item name='name' label="Name">
              <Input />
            </Form.Item>
            <Form.Item name='userId' label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name='password' label="Password">
              <Input type='password' />
            </Form.Item>
            
            <div className="d-flex justify-content-between align-items-center">
            <Link to='/login'> Already Registered? Click here to Login </Link>
              <Button htmlType='submit' type='primary'>Register</Button>
            </div>
          </Form>
        </Col>
    </Row>
   </div>
  )
}
export default Register