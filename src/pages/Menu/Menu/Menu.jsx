import React from 'react';
import { Helmet } from 'react-helmet-async';
import Cover from '../../Shared/Cover/Cover';
import menuImg from './../../../assets/menu/banner3.jpg'
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

import dessertImg from './../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from './../../../assets/menu/pizza-bg.jpg'
import saladImg from './../../../assets/menu/salad-bg.jpg'
import soupImg from './../../../assets/menu/soup-bg.jpg'
import drinksImg from './../../../assets/menu/banner3.jpg'

const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert');
    const pizzas = menu.filter(item => item.category === 'pizza');
    const salads = menu.filter(item => item.category === 'salad');
    const soups = menu.filter(item => item.category === 'soup');
    const drinks = menu.filter(item => item.category === 'drinks');
    const offered = menu.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Menu</title>
            </Helmet>
            <Cover img={menuImg} title="Our Menu" />
            <SectionTitle heading={"TODAY'S OFFER"} subHeading={"Don't miss"} />
            <MenuCategory item={offered} />
            <MenuCategory item={desserts} title={"dessert"} coverImg={dessertImg} />
            <MenuCategory item={pizzas} title={"pizza"} coverImg={pizzaImg} />
            <MenuCategory item={salads} title={"salad"} coverImg={saladImg} />
            <MenuCategory item={soups} title={"soups"} coverImg={soupImg} />
            <MenuCategory item={drinks} title={"drinks"} coverImg={drinksImg} />
        </div>
    );
};

export default Menu;