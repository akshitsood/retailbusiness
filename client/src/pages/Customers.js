import React, { useEffect, useState,useRef } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Button, Table, Modal, Input,Form, message,Select } from 'antd'
import { DeleteOutlined,EyeOutlined, EditOutlined } from '@ant-design/icons';
import {ReactToPrint, useReactToPrint} from 'react-to-print'

function Customers() {
  const componentRef=useRef()
  const [billsdata, setbillsData] = useState([])
  
  const dispatch = useDispatch();
  const getallbills = () => {
    dispatch({ type: 'showLoading' })
    axios.get('/api/bills/get-all-bills').then((response) => {
      dispatch({ type: 'hideLoading' })
      const data=response.data
      data.reverse()
      setbillsData(data);
    }).catch((error) => {
      dispatch({ type: 'hideLoading' })
      console.log(error)
    })
  }
  const columns = [
    
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
     
    },
    {
      title: 'Phone Number',
      dataIndex: 'customerPhoneNumber'
    },
    {
      title: 'Billed On',
      dataIndex: 'createdAt',
      render:(value)=><span>{value.toString().substring(0,10)}</span>
    },
    {
        title: 'Total',
        dataIndex: 'totalAmount'
  
      },
        
  ]
 
  useEffect(() => {
    getallbills();
        }, [])
        
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Customers</h3>
       
      </div>
      <Table columns={columns} dataSource={billsdata} bordered />
     
    </DefaultLayout>
  )
}

export default Customers