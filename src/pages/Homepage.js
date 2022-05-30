import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'antd'
import Item from '../components/Item'
import '../resources/items.css'
import '../resources/layout.css'
import DefaultLayout from '../components/DefaultLayout'
import { useDispatch } from 'react-redux'
function Homepage() {

  const [itemsdata, setItemsData] = useState([])
  const[selectedCategory,setselectedCategory]=useState('fruits')
  const categories=[
    {
      name:'fruits',
      imageURL:'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/assortment-of-colorful-ripe-tropical-fruits-top-royalty-free-image-995518546-1564092355.jpg'
    },
    {
      name:'vegetables',
      imageURL:'https://media.istockphoto.com/photos/food-background-with-assortment-of-fresh-organic-fruits-and-picture-id1203599963?k=20&m=1203599963&s=612x612&w=0&h=XY0PiCcaw1HShjCU9JgywVoY5JQC-lZnZfWqyyREOus='
    },
    {
      name:'meat',
      imageURL:'https://nypost.com/wp-content/uploads/sites/2/2022/05/iStock-1310910433.jpg?quality=75&strip=all&w=1024'
    },
    {
      name:'Snacks',
      imageURL:'https://www.mensjournal.com/wp-content/uploads/2016/05/snacks-main.jpg?quality=40&strip=all'
    }
  ]
  const dispatch=useDispatch()
  const getallitems =()=>

  {
    dispatch({type:'showLoading'})
    axios.get('/api/items/get-all-items').then((response) => {
      dispatch({type:'hideLoading'})
      setItemsData(response.data)
    }).catch((error) =>
     {
      dispatch({type:'hideLoading'})
      console.log(error)
    })
  }
  useEffect(() => {
    getallitems()

  }, [])

  return (
    <DefaultLayout>
     <div className="d-flex">
       {categories.map((category)=>{
         return <div onClick={()=>setselectedCategory(category.name)} className={`d-flex category ${selectedCategory===category.name && 'selected-category'}`}>
            <h4>{category.name}</h4>
            <img src={category.imageURL} height='60' width='80' alt="" />
          </div>
       })}
     </div>
      <Row gutter={20}>
        {itemsdata.filter((i)=>i.category==selectedCategory) .map((item) => {
          return <Col xs={24} lg={6} md={12} sm={15.5}>
            <Item item={item} />
          </Col>
        })}
      </Row>

    </DefaultLayout>
  );
}

export default Homepage;