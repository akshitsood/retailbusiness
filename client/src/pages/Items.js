import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { Button, Table, Modal, Input,Form, message,Select } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

function Items() {
  const [itemsdata, setItemsData] = useState([])
  const [addEditModalVisibility, setEditAddModalVisibility] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const dispatch = useDispatch()
  const getallitems = () => {
    dispatch({ type: 'showLoading' })
    axios.get('/api/items/get-all-items').then((response) => {
      dispatch({ type: 'hideLoading' })
      setItemsData(response.data)
    }).catch((error) => {
      dispatch({ type: 'hideLoading' })
      console.log(error)
    })
  }
  const deleteItem = (record) => {
    dispatch({ type: 'showLoading' })
    axios.post('/api/items/delete-item',{itemId:record._id}).then((response) => {
      dispatch({ type: 'hideLoading' })
      message.success('Item deleted successfully')
     getallitems()
    }).catch((error) => {
      dispatch({ type: 'hideLoading' })
      message.error('Something went wrong')
      console.log(error)
    })
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'

    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => <img src={image} alt="" height='60' width='60' />
    },
    {
      title: 'Price',
      dataIndex: 'price'
    },
    {
      title: 'Category',
      dataIndex: 'category'
    },

    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => <div className='d-flex'>
        <EditOutlined className='mx-2' onClick={() => {
          setEditingItem(record)
          setEditAddModalVisibility(true)
        }} />
        <DeleteOutlined className='mx-2' onClick={()=>deleteItem(record)} />

      </div>
    }
  ]
  useEffect(() => {
    getallitems()

  }, [])
  const onFinish = (values) => {

    dispatch({ type: 'showLoading' })

    if (editingItem === null) {
      axios.post('/api/items/add-item', values).then((response) => {
        dispatch({ type: 'hideLoading' })
        message.success('Item added successfully')
        setEditAddModalVisibility(false)
        getallitems()
      }).catch((error) => {
        dispatch({ type: 'hideLoading' })
        message.success('Something went wrong')
      })
    }
    else {
      axios.post('/api/items/edit-item', {...values,itemId:editingItem._id}).then((response) => {
        dispatch({ type: 'hideLoading' })
        message.success('Item edited successfully')
        setEditingItem(null)
        setEditAddModalVisibility(false)
        getallitems()
      }).catch((error) => {
        dispatch({ type: 'hideLoading' })
        message.success('Something went wrong')
      })
    }
  }
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button type="primary" onClick={() => setEditAddModalVisibility(true)}>Add Item</Button>
      </div>
      <Table columns={columns} dataSource={itemsdata} bordered />
      {addEditModalVisibility && (
        <Modal onCancel={() => {
          setEditingItem(null)
          setEditAddModalVisibility(false)
        }} visible={addEditModalVisibility} title={`${editingItem !== null ? `Edit Item` : `Add new item`}`} footer={false}>
          <Form initialValues={editingItem} layout="vertical" onFinish={onFinish}>
            <Form.Item name='name' label="Name">
              <Input />
            </Form.Item>
            <Form.Item name='price' label="Price">
              <Input />
            </Form.Item>
            <Form.Item name='image' label="Image URL">
              <Input />
            </Form.Item>
            <Form.Item name='category' label="Category">
              <Select>
                <Select.Option value='fruits'>Fruits</Select.Option>
                <Select.Option value='vegetables'>Vegetables</Select.Option>
                <Select.Option value='meat'>Meat</Select.Option>
                <Select.Option value='Snacks'>Snacks</Select.Option>
              </Select>
            </Form.Item>
            <div className="d-flex justify-content-end">
              <Button htmlType='submit' type='primary'>Save</Button>
            </div>
          </Form>

        </Modal>
      )}
    </DefaultLayout>
  )
}

export default Items