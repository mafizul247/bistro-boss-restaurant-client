import React from 'react';
import { Helmet } from 'react-helmet-async';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';
import Cover from '../../../Shared/Cover/Cover';
import coverImg from './../../../assets/menu/banner3.jpg';
import dessertImg from './../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from './../../../assets/menu/pizza-bg.jpg';
import saladImg from './../../../assets/menu/salad-bg.jpg';
import soupImg from './../../../assets/menu/soup-bg.jpg';
import { useNavigation } from 'react-router-dom';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';

const Menu = () => {
    const navigation = useNavigation();

    if(navigation.state === 'loading') {
        return <LoadingSpinner />
    }

    const [menu] = useMenu();
    const offered = menu?.filter(item => item.category === 'offered');
    const desserts = menu?.filter(item => item.category === 'dessert');
    const pizza = menu?.filter(item => item.category === 'pizza');
    const salad = menu?.filter(item => item.category === 'salad');
    const soup = menu?.filter(item => item.category === 'soup');

    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Menu</title>
            </Helmet>
            <Cover img={coverImg} title={'Our Menu'} />
            <div className='px-24 py-8'>
                <SectionTitle heading={"Today's Offer"} subHeading={"Don't miss"} />
                <MenuCategory items={offered} />
                <MenuCategory items={desserts} title={"dessert"} img={dessertImg} />
                <MenuCategory items={pizza} title={"pizza"} img={pizzaImg} />
                <MenuCategory items={salad} title={"salad"} img={saladImg} />
                <MenuCategory items={soup} title={"soup"} img={soupImg} />
            </div>
        </div>
    );
};

export default Menu;