import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Header, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoginForm from "../../users/LoginForm";
import RegisterForm from "../../users/RegisterForm";

export default observer (function HomePage() {
    const {userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign='center' className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    Welcome to Activities!
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                    <Button as={Link} to='/activities' size='huge' inverted>
                    Go to activities!
                    </Button>
                    </>
                ) : (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                                Login
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                                Register
                            </Button>
                        </>
                )}
            </Container>
        </Segment>
    )
})