import { Filter1Rounded } from '@mui/icons-material';
import './MenuItem.css';
import { useState,useEffect } from 'react';
import Cardd from './Cardd';
import   './ExpenseItem.css';
const MenuItemm = (props) =>{
 
return(
    
    <main>
        
        <div class="cardd">
            
            <img src={"http://localhost:5105/Oglas/VratiSliku/"+props.slika} alt=""/>
            <div class="info">
                <h1>{props.oglas.ime}</h1>
                <h3>{props.oglas.cena}</h3>
                <a href="#" class="btn">Read More</a>
            </div>
        </div>
        
        {/* <div class="card">
            <img src="https://user-images.githubusercontent.com/13468728/230662939-40a60e43-2d49-4cc1-9bb2-bed6da083e88.jpg" alt=""/>
            <div class="info">
                <h1>Heading</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!</p> 
                <a href="#" class="btn">Read More</a>
            </div>
        </div>

        <div class="card">
            <img src="https://user-images.githubusercontent.com/13468728/230662955-9deccd97-6e8f-4ec0-8257-50f6627f5663.jpg" alt=""/>
            <div class="info">
                <h1>Heading</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!</p>
                <a href="#" class="btn">Read More</a>
            </div>
        </div>
        <div class="card">
            <img src="https://user-images.githubusercontent.com/13468728/230662955-9deccd97-6e8f-4ec0-8257-50f6627f5663.jpg" alt=""/>
            <div class="info">
                <h1>Heading</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!</p>
                <a href="#" class="btn">Read More</a>
            </div>
        </div>
        <div class="card">
            <img src="https://user-images.githubusercontent.com/13468728/230662955-9deccd97-6e8f-4ec0-8257-50f6627f5663.jpg" alt=""/>
            <div class="info">
                <h1>Heading</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!</p>
                <a href="#" class="btn">Read More</a>
            </div>
        </div>
        <div class="card">
            <img src="https://user-images.githubusercontent.com/13468728/230662955-9deccd97-6e8f-4ec0-8257-50f6627f5663.jpg" alt=""/>
            <div class="info">
                <h1>Heading</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus incidunt id!</p>
                <a href="#" class="btn">Read More</a>
            </div>
        </div> */}
    </main>
    
);}
export default MenuItemm;