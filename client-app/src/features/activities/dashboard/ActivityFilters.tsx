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
                <Menu.Item
                    content="Gėrimai"
                    active={predicate.has('category')}
                    onClick={() => setPredicate('category', 'drinks')}
                />
                <Menu.Item
                    content="Kultūra"
                    active={predicate.has('category')}
                    onClick={() => setPredicate('category', 'culture')}
                />
                <Menu.Item
                    content="Filmai"
                    active={predicate.has('category')}
                    onClick={() => setPredicate('category', 'film')}
                />
                <Menu.Item
                    content="Maistas"
                    active={predicate.has('category')}
                    onClick={() => setPredicate('category', 'food')}
                />
                <Menu.Item
                    content="Muzika"
                    active={predicate.has('category')}
                    onClick={() => setPredicate('category', 'music')}
                />
                <Menu.Item
                    content="Kelionės"
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