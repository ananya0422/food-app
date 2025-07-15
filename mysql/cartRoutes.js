
import authenticateToken  from './middleware.js';


import db from './db.js'
import menu from './menu.js'
import express from 'express'

const router = express.Router();

router.get('/menu', (req,res)=>{
    res.json(menu);
})

router.get('/cart', authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    console.log(email);
    const [rows] = await db.execute('SELECT * FROM cart_details WHERE email = ?', [email]);
   
    res.json(rows);
   // console.log(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching cart' , err});
  }
});


 router.post('/cart/add', authenticateToken, async(req,res)=>{
  const{product_title, price, quantity,productid} = req.body;
  const email= req.user.email;

    

  try{
    const[row] = await db.execute('select * from cart_details where email=? and product_title=?' ,[email,product_title]);

  //console.log(row)
  if(row.length>0){
    await db.execute('update cart_details set quantity= quantity+ ? where email=? and product_title=?',[quantity || 1,email,product_title,]);
  }
  else{
    await db.execute('insert into cart_details(email,product_title,quantity,price,productid) values(?,?,?,?,?)',
      [email,product_title,quantity,price,productid])
  }


  res.json({message:"item added to cart"})
  
  } catch(err){
    console.log(err)
    res.status(500).json({ error: 'Error adding to cart', err });
  }
 });

 //delete

 router.delete('/cart/:productid', authenticateToken,async(req ,res)=>{
  

  const email= req.user.email;
  //console.log(email)
  const productid= parseInt(req.params.productid);
  console.log(productid);

  if (!email || !productid) {
    return res.status(400).json({ message: "Missing email or product ID" });
  }


  try{
    const [rows]= await db.execute('select quantity from cart_details where email=? and productid=?',[email,productid])
    // console.log('item deleted',email)
     
    
  console.log(rows)

  if(rows.length===0){
    return res.status(404).json({message :"item not found in the cart"})
  }
   const currentQty =rows[0].quantity;

   if(currentQty<=1){
    await db.execute('delete from cart_details where email=? and productid=?',
      [email,productid]);
      // console.log(email, productid);
      //console.log(id)
    
  }
    else{
      await db.execute("update cart_details set quantity = quantity-1 where email=? and productid=?",
        [email,productid]
      );
    }
    res.json({message:'item removed from cart'});
  }
  
   
 catch(err){
  console.log(err)
  res.status(500).json({message:'error removing item from cart', err});
 }
})

router.delete('/cart/delete/:productid',authenticateToken, async(req,res)=>{
  const email = req.user.email;
  const productid = req.params.productid;

   if (!email || !productid) {
    return res.status(400).json({ message: "Missing email or product ID" });
  }

  try{
    const[rows] = await db.execute("select quantity from cart_details where email=? and productid=?",[email,productid]);
    console.log(rows);

    if(rows.length===0){
    return res.status(404).json({message :"item not found in the cart"})
  }
const currentQty =rows[0].quantity;

   if(currentQty<=1){
    await db.execute('delete from cart_details where email=? and productid=?',
      [email,productid]);

  }
  res.json({message:'item deleted from cart'});


}

catch(err){
  console.log(err)
  res.status(500).json({message:'error removing item from cart', err});
 }
})

router.post('/cart/deliveryAdd', authenticateToken,async(req,res)=>{
  const {name,phone_number,pincode,emailAdd,address,city,state} = req.body;
  const email = req.user.email ;
  console.log(email)

try{

const[row] = await db.execute('select * from delivery_details where email=?',[email]);
console.log(row);



 const insertQuery = `
      INSERT INTO delivery_details 
      (email, name, phone_number, pincode, emailAdd, address, city, state)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;


console.log("Values before insert:", {
  email,
  name,
  phone_number,
  pincode,
  emailAdd,
  address,
  city,
  state
});


    await db.execute(insertQuery, [
      email,
      name,
      phone_number,
      pincode,
      emailAdd,
      address,
      city,
      state
    ]);

   


    res.status(200).json({ message: 'Delivery address saved successfully' });


}
catch(err){
  console.error('Error saving address:', err);
    res.status(500).json({ message: 'Something went wrong' });
}

}

)

router.get('/cart/deliveryAdd',authenticateToken, async (req,res)=>{

  try{
  const email = req.user.email;
 // console.log(email)
  //const{name,phone_number,pincode,emailAdd,address,city,state}= req.body;
  const sql = 'select * from delivery_details where emailAdd=? order by id';
  const [result]=await db.execute(sql,[email]);

   if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Address not found' });
    }
  

  } catch (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Database error' });
  }
   
  

  })







export default router;