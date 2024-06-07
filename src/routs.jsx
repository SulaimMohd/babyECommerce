import React from "react"
import { createBrowserRouter } from "react-router-dom"
import App from "./Components/App.jsx"
import Protected from "./Components/Portected.jsx"
import LayOut from "./Components/LayOut.jsx"
import Home from "./Pages/Home/Home"
import LogIn from "./Pages/LogIn/LogIn"
import SignUp from './Pages/SignUp/SignUp.jsx'
import ProductCard from "./Components/ProductCard.jsx"
import Product from "./Pages/Product/Product"
import ProductPage from "./Pages/featuringProduct/ProductPage"
import AddProduct from "./Pages/Admin/AddPorduct.jsx"
import Cart from "./Pages/Cart/Cart"
import ThankYou from "./Pages/ThankYou/ThankYou.jsx"
import NotFoundPage from "./Pages/404/NotFound.jsx"
import AdimnLayOut from "./Components/AdminLayOut.jsx"
import UpdateProduct from "./Pages/UpdateProduct/UpdateProduct.jsx"
// import ProductPage from "./Pages/featuringProduct/ProductPage"

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {
        path:'/',
        element:(
          <Protected authentication = {false}>
            <LogIn />
          </Protected>
        )
      },
      {
        path:'/login',
        element:(
          <Protected authentication = {false}>
            <LogIn />
          </Protected>
        )
      },
      {
        path:'/signup',
        element:(
          <Protected authentication = {false}>
            <SignUp />
          </Protected>
        )
      }
    ]
  },
  {
    path:'/auth/:user',
    element:(
        <Protected>
            <LayOut />
        </Protected>
        ),
    children:[
      {
        path:'/auth/:user/home',
        element:(
            <Protected authentication  = {true}>
              <Home />
            </Protected>
        )
      },
      {
        path: '/auth/:user/products',
        element:(
          <Protected authentication>
              <Product />
          </Protected>
        )
      },
      {
        path: '/auth/:user/:productDocId',
        element:(
          <Protected authentication>
              <ProductPage />
          </Protected>
        )
      },
      {
        path:'/auth/:user/cart',
        element:(
          <Protected authentication>
              <Cart />
          </Protected>
        )
      },
      {
        path:'/auth/:user/ThanksPage',
        element:(
          <Protected authentication = {true}>
            <ThankYou />
          </Protected>
        )
      },
    ]
  },
  {
    path:'/admin',
    element:(<Protected authentication>
              <AdimnLayOut/>
            </Protected>),
    children:[
      {
        path:'/admin/addProduct',
        element:(<Protected authentication>
                    <AddProduct/>
                </Protected>),
      },
      {
        path:'/admin/updateProduct',
        element:(<Protected authentication>
                    <UpdateProduct/>
                </Protected>),
      }
    ]
  },
  {
    path:'/*',
    element:<NotFoundPage />,
  }
])
export default router;
