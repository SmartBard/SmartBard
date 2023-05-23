import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../Interface/Style.css';

export default function SpeechVoices({voice, setVoice}) {
    const voices = speechSynthesis.getVoices();


    return (
        <div className='font-size-setting'>
            <Container>
                <Row>
                    <h5 className='font-size-description'>Voice</h5>
                    <Col>
                        <DropdownButton className='font-size-dropdown' title={voice} drop='down-centered'>
                            <Dropdown.Item as="button">
                                <div onClick={() => setVoice(voices[1].name)}>{voices[1].name}</div>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <div onClick={() => setVoice(voices[2].name)}>{voices[2].name}</div>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <div onClick={() => setVoice(voices[3].name)}>{voices[3].name}</div>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <div onClick={() => setVoice(voices[4].name)}>{voices[4].name}</div>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <div onClick={() => setVoice(voices[5].name)}>{voices[5].name}</div>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <div onClick={() => setVoice(voices[6].name)}>{voices[6].name}</div>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <div onClick={() => setVoice(voices[7].name)}>{voices[7].name}</div>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <div onClick={() => setVoice(voices[8].name)}>{voices[8].name}</div>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <div onClick={() => setVoice(voices[9].name)}>{voices[9].name}</div>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <div onClick={() => setVoice(voices[10].name)}>{voices[10].name}</div>
                            </Dropdown.Item>
                        </DropdownButton>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}