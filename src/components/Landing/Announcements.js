import React, {useContext} from 'react'
import Slider from "react-slick"
import {Card, Container} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../Interface/Style.css"
import FontSizeContext from '../Settings/FontSize-Context';
import FontColorContext from '../Settings/FontColor-Context';

export default function Announcements(props) {

    let data = props.data

    const navigate = useNavigate();
    const fontSizeNumber = useContext(FontSizeContext);
    const fontColor = useContext(FontColorContext);
    var slidesPerScreen = Math.min(data.length, 3)

    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
            />
            );
    }

    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
            className={className}
            style={{ ...style, display: "block", background: "black" }}
            onClick={onClick}
            />
            );
    }

    var settings = {

        infinite: true,
        centerPadding: "60px",
        dots: true,
        speed: 500,
        slidesToShow: slidesPerScreen,
        slidesToScroll: 3,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,

    };

    function truncateText(text, length) {
        if (text.length <= length) {
            return text;
        }
        return text.substring(0, length) + " . . . ";
    }



    const announcements = data.map((announcement) => {


        return <Card style={{border: '2px solid black'}} className="slide-post" onDoubleClick={() => navigate(`/home/${announcement.announcementid}`)}>
            <h1 style={{ 
                        color: fontColor,
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                        }}>{announcement.title}</h1>
            <Card.Body style={{display: 'flex', flexDirection: 'column', height: '300px'}} >
                <p style={{
                    fontSize: fontSizeNumber,
                    color: fontColor
                }}>
                    {truncateText(announcement.body, 40)}
                </p>
                {announcement.media && (
                    <div className="d-flex justify-content-center align-items-center" style={{overflow: 'hidden'}} >
                      <img src={announcement.media} style={{maxWidth: '100%', maxHeight: '100%', objectFit: 'contain'}} alt='preview image of post' />
                    </div>)}
            </Card.Body>
        </Card>
    })

    return (
        <React.Fragment>
            <Container >
                <h1 style={{color: fontColor}}>Announcements</h1>
                <Slider {...settings} >
                    {announcements}
                </Slider>
            </Container>
        </React.Fragment>

    )
}
