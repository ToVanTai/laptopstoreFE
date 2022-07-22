🤣 user
/user/login
/user/register
/user/about
/user/change-password
/user/carts
/user/purchased
🤣 home
/home?page=?sort-by=?limit
🤣 search
/search?type=?value=?page=?limit=?sort_by=
================================================
😎 admin
/admin
😎 products 
/admin/manage-products->getAllProducts
/admin/manage-products/new-product->addNewProduct
/admin/manage-products/change-product/:id->changeProduct
/admin/manage-products/capacities/:id->getAllCapacities
/admin/manage-products/new-capacity/:id->addNewCapacity
/admin/manage-products/change-capacity/:id=&product_id=->changeCapacity
😎 brands
/admin/manage-bands->getAllBrands
/admin/manage-bands/new_brand->addNewBrand
😎 carts
/admin/manage-carts?status_id= ->getAllCarts
/admin/manage-carts:cart_id ->getInforCart
================================================
Large:
(   
    Sidebar
    Container(
        Main
    )
    Footer
)
Tablet:
(
    Navbar
    Container(
        Main    
    )
    Footer
)








