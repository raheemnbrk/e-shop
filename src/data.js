export async function getHomeProducts(){
    const res = await fetch("https://dummyjson.com/products?limit=5")
    if(!res.ok){
        throw{
            message : "failed to fetch products",
            status : res.status ,
            statusText : res.statusText
        }
    } 
    const data = await res.json()
    return data.products 
}

export async function getProducts(id){
  const url = id ? `https://dummyjson.com/products/${id}` : "https://dummyjson.com/products"  
  const res = await fetch(url)
  if(!res.ok){
    throw{
        message : "failed to fetch products" ,
        status : res.status ,
        statusText : res.statusText
    }
  }

  const data = await res.json()
  return id ? data : data.products
}