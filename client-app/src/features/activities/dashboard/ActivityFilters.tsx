import { observer } from "mobx-react-lite";
import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function ActivityFilters() {
    const {activityStore: {predicate, setPredicate}} = useStore();
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 26 }}>
                <Header icon='filter' attached color='blue' content='Filters' />
                <Menu.Item 
                    content='All Activities'
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item 
                    content="I'm going"
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', 'true')}
                 />
                <Menu.Item
                content="I'm hosting"
                active={predicate.has('isHost')}
                onClick={() => setPredicate('isHost', 'true')}
                />
                <Menu.Item
                    content="Drinks"
                    active={predicate.has('category')}
                    onClick={() => setPredicate('category', 'drinks')}
                />
                <Menu.Item
                    content="Culture"
                    active={predicate.has('category')}
                    onClick={() => setPredicate('category', 'culture')}
                />
                <Menu.Item
                    content="Films"
                    active={predicate.has('category')}
                    onClick={() => setPredicate('category', 'film')}
                />
                <Menu.Item
                    content="Food"
                    active={predicate.has('category')}
                    onClick={() => setPredicate('category', 'food')}
                />
                <Menu.Item
                    content="Music"
                    active={predicate.has('category')}
                    onClick={() => setPredicate('category', 'music')}
                />
                <Menu.Item
                    content="Travel"
                    active={predicate.has('category')}
                    onClick={() => setPredicate('category', 'travel')}
                />        
            </Menu>
            <Header />
            <Calendar 
                onChange={(date: Date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}
            />
        </>
    )
})