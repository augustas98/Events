import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { Dropdown, Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import lt from 'date-fns/locale/lt';
import { registerLocale } from "react-datepicker";
registerLocale("lt", lt);

export default observer(function ActivityFilters() {
    const {activityStore: {predicate, setPredicate}} = useStore();
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 26 }}>
                <Header icon='filter' attached color='blue' content='Filtrai' />
                <Menu.Item 
                    content='Visi renginiai'
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item 
                    content="Aš dalyvausiu"
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', 'true')}
                 />
                <Menu.Item
                content="Aš rengiu"
                active={predicate.has('isHost')}
                onClick={() => setPredicate('isHost', 'true')}
                />
                <Dropdown text='Kategorija' pointing='left' className='link item'>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setPredicate('category', 'drinks')}>Gėrimai</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPredicate('category', 'culture')}>Kultūra</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPredicate('category', 'film')}>Filmai</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPredicate('category', 'food')}>Maistas</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPredicate('category', 'music')}>Muzika</Dropdown.Item>
                    <Dropdown.Item onClick={() => setPredicate('category', 'travel')}>Kelionės</Dropdown.Item>
                </Dropdown.Menu>    
                </Dropdown>   
            </Menu>
            <Header />
            <Calendar
                locale="lt" 
                onChange={(date: Date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            />
        </>
    )
})