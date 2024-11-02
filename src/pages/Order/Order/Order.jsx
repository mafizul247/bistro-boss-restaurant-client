import React, { useState } from 'react';
import coverImage from './../../../assets/shop/banner2.jpg'
import Cover from '../../Shared/Cover/Cover';
import { Helmet } from 'react-helmet-async';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../../hooks/useMenu';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';

const Order = () => {
    const categories = ['dessert', 'pizza', 'salad', 'soup', 'drinks', 'offered'];
    const { category } = useParams();
    const initialIndex = categories.indexOf(category);
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu();
    const desserts = menu?.filter(item => item.category === 'dessert');
    const pizza = menu?.filter(item => item.category === 'pizza');
    const salad = menu?.filter(item => item.category === 'salad');
    const soup = menu?.filter(item => item.category === 'soup');
    const drinks = menu?.filter(item => item.category === 'drinks');
    const offered = menu?.filter(item => item.category === 'offered');

    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Order Food</title>
            </Helmet>
            <Cover img={coverImage} title={"Order Food"} />
            <div className='my-12'>
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Dessert</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Salad</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Drinks</Tab>
                        <Tab>Offerd</Tab>
                    </TabList>
                    <TabPanel>
                        <OrderTab items={desserts} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizza} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={salad} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soup} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinks} />
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={offered} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
};

export default Order;