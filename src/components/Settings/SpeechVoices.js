import React from 'react';
import {Col, Container, Row} from 'react-bootstrap';
import '../Navbar/Style.css';

export default function SpeechVoices() {

    const voices = speechSynthesis.getVoices();


    return (
        <div className='voices-setting'>
            <Container>
                <Row>
                    <Col xs={6} md={4}>

                    </Col>
                    <Col xs={12} md={8}>
                        <h5 className='voices-description'> Adjust Speech Voice</h5>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}