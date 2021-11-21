import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/house-logo.png" alt="logo" style={{marginRight: '10px'}} />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name='Activities'></Menu.Item>
                <Menu.Item as={NavLink} to='/errors' name='Errors'></Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content='Create Activity'></Button>
                </Menu.Item>
            </Container>
        </Menu>
    )
}