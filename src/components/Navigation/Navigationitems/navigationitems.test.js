import React from 'react'
import Adapter from 'enzyme-adapter-react-16'
import { configure,shallow } from 'enzyme'
import Navigationitems from './navigationitems'
import NavigationItem from './Navigationitem/navigationitem'

configure({adapter:new Adapter()})

describe('<Navigationitems/>',()=>{

    let wrapper;

    beforeEach(()=>{
         wrapper=shallow(<Navigationitems/>)
    })


    it('Should render NavigationItem twice if the user is not authenticated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    });


    it('Should render NavigationItem thrice if the user is authenticated',()=>{
        wrapper.setProps({logout:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    });
})