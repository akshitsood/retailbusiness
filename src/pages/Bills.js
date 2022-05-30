import React, { useEffect, useState,useRef } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Button, Table, Modal, Input,Form, message,Select } from 'antd'
import { DeleteOutlined,EyeOutlined, EditOutlined } from '@ant-design/icons';
import {ReactToPrint, useReactToPrint} from 'react-to-print'

function Bills() {
  const componentRef=useRef()
  const [billsdata, setbillsData] = useState([])
  const [printbillModalVisibility, setprintbillModalVisibility] = useState(false)
  const[selectedbill,setselectedbill]=useState(null)
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
      title: 'SubTotal',
      dataIndex: 'subTotal'
    },
    {
      title: 'Tax',
      dataIndex: 'tax'
    },
    {
        title: 'Total',
        dataIndex: 'totalAmount'
  
      },
      {
        title: 'ID',
        dataIndex: '_id',
       
      },
        {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) =>( 
      <div className='d-flex'>
       <EyeOutlined className='mx-2' onClick={()=>{
         setselectedbill(record)
         setprintbillModalVisibility(true)
       }} />

      </div>
      )
    }
  ]
  const cartcolumns = [
    {
      title: 'Name',
      dataIndex: 'name'

    },
    
    {
      title: 'Price',
      dataIndex: 'price'
    },
    {
      title: 'Quantity',
      dataIndex: '_id',
      render: (id, record) => <div>
      
        <b>{record.quantity}</b>
      
      </div>
    },
    {
      title: 'Total',
      dataIndex: '_id',
      render: (id, record) => 
      <div>
      
        <b>{record.quantity*record.price}</b>
      
      </div>
    },
    
  ]
  useEffect(() => {
    getallbills();
        }, [])
        const handlePrint=useReactToPrint({
          content:()=>componentRef.current,
        })
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Bills</h3>
       
      </div>
      <Table columns={columns} dataSource={billsdata} bordered />
      {printbillModalVisibility && (
        <Modal onCancel={() => {
          setprintbillModalVisibility(false)
        
        }} visible={printbillModalVisibility}
         title='Bill Details'
          footer={false}
          width={800}>
          <div className='bill-model p-3' ref={componentRef}>
            <div className="d-flex justify-content-between bill-header pb-2">
            <div>
              <h1><b>STORE</b></h1>
            </div>
            <div>
                <p>Chandigarh</p>
                <p>Sector 18</p>
                <p>1234567890</p>
            </div>
            </div>
            <div className="bill-customer-details my-2">
              <p><b>Name : </b>{selectedbill.customerName}</p>
              <p><b>Phone Number : </b>{selectedbill.customerPhoneNumber}</p>
              <p><b>Date : </b>{selectedbill.createdAt.toString().substring(0,10)}</p>
            </div>
            <Table dataSource={selectedbill.cartItems} columns={cartcolumns} pagination={false}/>
            <div className='dotted-border mt-2 pb-2'>
              <p><b>Sub-total : </b>{selectedbill.subTotal}</p>
              <p><b>Tax : </b>{selectedbill.tax}</p>
            </div>
            <div>
              <h2><b>Grand-Total: {selectedbill.totalAmount}</b></h2>
            </div>
            <div className='dotted-border '></div>
            <div className="text-center">
              <p>Thanks</p>
              <p>Visit Again!!</p>
            </div>
          </div> 
          <div className="d-flex justify-content-end">
            <Button type='primary' onClick={handlePrint}>Print Bill</Button>
          </div>
        </Modal>
      )}
    </DefaultLayout>
  )
}

export default Bills