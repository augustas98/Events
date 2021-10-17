import React from "react";
import { Link } from "react-router-dom";
import { Container, Segment, Header, Button } from "semantic-ui-react";

export default function HomePage() {
    return (
        <Segment inverted textAlign='center' className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    Activities
                </Header>
                <Button as={Link} to='/activities' size='huge' inverted>
                    Take me to the Activities!
                </Button>
            </Container>
        </Segment>
    )
}