/* Global Imports */
import { FC, useEffect, useState } from 'react';

/* Application Level Imports */
import * as UI from '@/components';
import * as Features from '@/containers';
import * as Hooks from '@/hooks';

/* Local Imports */
import './Products.style.css';
import { ProductDTO } from '@/core/dto/product.dto';
import ProductService from '@/core/services/Product.service';
import { AppAction } from '@/store/store';


interface ProductsProps { }

const Products: FC<ProductsProps> = () => {

   Hooks.useDocumentTitle('Products View');


   const { data, dispatch } = Hooks.useStore()

   return (
      <div className="Products" data-testid="Products">
         <UI.Main>
            Products Content
            <hr />

            <UI.Card title={data.feedback || 'Infos'}>
               {
                  data.products.length
                     ? `There is ${data.products.length} products`
                     : <UI.Loader label='Initializing' />
               }
               <br />
               <br />
               <UI.Button 
                  action={() => { dispatch({ type: AppAction.PRODUCT_LIST_REQUEST }) }} 
                  size='medium' level='critical'>Refresh List</UI.Button>
            </UI.Card>

            <hr />
            {
               data.products.map(p => (
                  <UI.Card 
                     title={p.title} 
                     key={p.id} 
                     actions={[{ label: 'Delete', onClick: () => { dispatch({ type: AppAction.PRODUCT_DELETION_REQUEST, payload: p }) } }]}>
                     <UI.Image src={p.thumbnail} />
                     <hr />
                     <h4>{p.price}</h4>
                  </UI.Card>
               ))
            }

         </UI.Main>
      </div>
   )
};

export default Products;
